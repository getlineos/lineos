import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";

type Operator = "+" | "-" | "x" | "÷" | "=";

const digitRows = [
	["7", "8", "9", "÷"],
	["4", "5", "6", "x"],
	["1", "2", "3", "-"],
	["0", ".", "=", "+"],
] as const;

export default function CalculatorApp() {
	const containerRef = useRef<HTMLDivElement>(null);
	const calculatorRef = useRef<HTMLDivElement>(null);
	const dragOffsetRef = useRef({ x: 0, y: 0 });
	const [display, setDisplay] = useState("0");
	const [storedValue, setStoredValue] = useState<number | null>(null);
	const [pendingOperator, setPendingOperator] = useState<Operator | null>(null);
	const [waitingForOperand, setWaitingForOperand] = useState(false);
	const [history, setHistory] = useState();
	const [position, setPosition] = useState({ x: 88, y: 56 });

	const parsedDisplay = Number(display);

	const formattedDisplay = useMemo(() => {
		if (display === "Error") {
			return display;
		}

		const numeric = Number(display);
		if (!Number.isFinite(numeric)) {
			return "Error";
		}

		return new Intl.NumberFormat("en-US", {
			maximumFractionDigits: 8,
		}).format(numeric);
	}, [display]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.metaKey ||
				event.ctrlKey ||
				event.altKey ||
				(event.shiftKey && event.key.length > 1)
			) {
				return;
			}

			if (/^[0-9]$/.test(event.key)) {
				event.preventDefault();
				inputDigit(event.key);
				return;
			}

			if (event.key === ".") {
				event.preventDefault();
				inputDecimal();
				return;
			}

			if (event.key === "+" || event.key === "-") {
				event.preventDefault();
				handleOperator(event.key as Operator);
				return;
			}

			if (event.key === "*") {
				event.preventDefault();
				handleOperator("x");
				return;
			}

			if (event.key === "/") {
				event.preventDefault();
				handleOperator("÷");
				return;
			}

			if (event.key === "%") {
				event.preventDefault();
				handlePercent();
				return;
			}

			if (event.key === "Enter" || event.key === "=") {
				event.preventDefault();
				handleOperator("=");
				return;
			}

			if (event.key === "Backspace") {
				event.preventDefault();
				handleBackspace();
				return;
			}

			if (event.key === "Escape") {
				event.preventDefault();
				clearAll();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	});

	useEffect(() => {
		const container = containerRef.current;
		const calculator = calculatorRef.current;

		if (!container || !calculator) {
			return;
		}

		const centeredX = Math.max(
			(container.clientWidth - calculator.clientWidth) / 2,
			24,
		);
		const centeredY = Math.max(
			(container.clientHeight - calculator.clientHeight) / 2,
			24,
		);

		setPosition({ x: centeredX, y: centeredY });
	}, []);

	const inputDigit = (digit: string) => {
		if (display === "Error") {
			setDisplay(digit);
			setWaitingForOperand(false);
			return;
		}

		if (waitingForOperand) {
			setDisplay(digit);
			setWaitingForOperand(false);
			return;
		}

		setDisplay((current) => (current === "0" ? digit : current + digit));
	};

	const inputDecimal = () => {
		if (display === "Error") {
			setDisplay("0.");
			setWaitingForOperand(false);
			return;
		}

		if (waitingForOperand) {
			setDisplay("0.");
			setWaitingForOperand(false);
			return;
		}

		if (!display.includes(".")) {
			setDisplay((current) => current + ".");
		}
	};

	const clearAll = () => {
		setDisplay("0");
		setStoredValue(null);
		setPendingOperator(null);
		setWaitingForOperand(false);
		setHistory("Calculator");
	};

	const handleBackspace = () => {
		if (waitingForOperand || display === "Error") {
			setDisplay("0");
			setWaitingForOperand(false);
			return;
		}

		setDisplay((current) => {
			if (
				current.length <= 1 ||
				(current.length === 2 && current.startsWith("-"))
			) {
				return "0";
			}

			return current.slice(0, -1);
		});
	};

	const toggleSign = () => {
		if (display === "0" || display === "Error") {
			return;
		}

		setDisplay((current) =>
			current.startsWith("-") ? current.slice(1) : `-${current}`,
		);
	};

	const handlePercent = () => {
		if (display === "Error") {
			return;
		}

		const value = parsedDisplay / 100;
		setDisplay(String(value));
		setHistory(`${formatCompact(parsedDisplay)}%`);
	};

	const handleOperator = (nextOperator: Operator) => {
		if (display === "Error") {
			clearAll();
			return;
		}

		const inputValue = Number(display);

		if (storedValue === null) {
			setStoredValue(inputValue);
			if (nextOperator !== "=") {
				setPendingOperator(nextOperator);
				setHistory(`${formatCompact(inputValue)} ${nextOperator}`);
				setWaitingForOperand(true);
			}
			return;
		}

		if (pendingOperator && pendingOperator !== "=" && !waitingForOperand) {
			const result = calculate(storedValue, inputValue, pendingOperator);

			if (result === null || !Number.isFinite(result)) {
				setDisplay("Error");
				setStoredValue(null);
				setPendingOperator(null);
				setWaitingForOperand(false);
				setHistory("Calculation error");
				return;
			}

			setDisplay(String(result));
			setStoredValue(result);
			setHistory(
				`${formatCompact(storedValue)} ${pendingOperator} ${formatCompact(inputValue)}${
					nextOperator === "=" ? "" : ` ${nextOperator}`
				}`,
			);
		}

		if (nextOperator === "=") {
			setPendingOperator(null);
			setStoredValue(null);
			setWaitingForOperand(true);
			return;
		}

		setPendingOperator(nextOperator);
		setWaitingForOperand(true);
	};

	const updatePosition = (clientX: number, clientY: number) => {
		const container = containerRef.current;
		const calculator = calculatorRef.current;

		if (!container || !calculator) {
			return;
		}

		const maxX = Math.max(container.clientWidth - calculator.clientWidth, 0);
		const maxY = Math.max(container.clientHeight - calculator.clientHeight, 0);
		const nextX = clamp(clientX - dragOffsetRef.current.x, 0, maxX);
		const nextY = clamp(clientY - dragOffsetRef.current.y, 0, maxY);

		setPosition({ x: nextX, y: nextY });
	};

	const handleDragStart = (event: PointerEvent<HTMLDivElement>) => {
		const calculator = calculatorRef.current;

		if (!calculator) {
			return;
		}

		const bounds = calculator.getBoundingClientRect();
		dragOffsetRef.current = {
			x: event.clientX - bounds.left,
			y: event.clientY - bounds.top,
		};

		const target = event.currentTarget;
		target.setPointerCapture(event.pointerId);
	};

	const handleDragMove = (event: PointerEvent<HTMLDivElement>) => {
		if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
			return;
		}

		updatePosition(event.clientX, event.clientY);
	};

	const handleDragEnd = (event: PointerEvent<HTMLDivElement>) => {
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
	};

	return (
		<div
			ref={containerRef}
			className="relative h-full overflow-hidden bg-transparent"
		>
			<div
				ref={calculatorRef}
				className="absolute w-full max-w-[360px] overflow-hidden rounded-[38px] border border-white/10 bg-[#111214] shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
				style={{ left: position.x, top: position.y }}
			>
				<div
					className="cursor-grab select-none bg-[linear-gradient(180deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0))] px-6 pb-5 pt-5 active:cursor-grabbing"
					onPointerDown={handleDragStart}
					onPointerMove={handleDragMove}
					onPointerUp={handleDragEnd}
					onPointerCancel={handleDragEnd}
				>
					<div className="mb-5 flex items-center gap-2">
						<span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
						<span className="h-3 w-3 rounded-full bg-[#febc2e]" />
						<span className="h-3 w-3 rounded-full bg-[#28c840]" />
					</div>
					<p className="text-right text-xs font-medium uppercase tracking-[0.22em] text-white/35">
						{history}
					</p>
					<div className="mt-5 min-h-[96px] text-right text-[56px] font-light leading-none tracking-tight text-white">
						{formattedDisplay}
					</div>
				</div>

				<div className="grid grid-cols-4 gap-3 bg-[#1b1c1f] px-5 pb-5 pt-4">
					<CalcButton label="AC" tone="utility" onClick={clearAll} />
					<CalcButton label="+/-" tone="utility" onClick={toggleSign} />
					<CalcButton label="%" tone="utility" onClick={handlePercent} />
					<CalcButton
						label="÷"
						tone="operator"
						active={pendingOperator === "÷"}
						onClick={() => handleOperator("÷")}
					/>

					{digitRows.flatMap((row) =>
						row.map((item) => {
							if (/^[0-9]$/.test(item)) {
								return (
									<CalcButton
										key={item}
										label={item}
										tone="number"
										onClick={() => inputDigit(item)}
									/>
								);
							}

							if (item === ".") {
								return (
									<CalcButton
										key={item}
										label={item}
										tone="number"
										onClick={inputDecimal}
									/>
								);
							}

							if (isOperator(item)) {
								return (
									<CalcButton
										key={item}
										label={item}
										tone="operator"
										active={pendingOperator === item}
										onClick={() => handleOperator(item)}
									/>
								);
							}

							return null;
						}),
					)}
				</div>
			</div>
		</div>
	);
}

function calculate(
	left: number,
	right: number,
	operator: Exclude<Operator, "=">,
) {
	switch (operator) {
		case "+":
			return left + right;
		case "-":
			return left - right;
		case "x":
			return left * right;
		case "÷":
			return right === 0 ? null : left / right;
	}
}

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

function isOperator(value: string): value is Operator {
	return (
		value === "+" ||
		value === "-" ||
		value === "x" ||
		value === "÷" ||
		value === "="
	);
}

function formatCompact(value: number) {
	return new Intl.NumberFormat("en-US", {
		maximumFractionDigits: 6,
	}).format(value);
}

function CalcButton({
	label,
	tone,
	onClick,
	active,
}: {
	label: string;
	tone: "utility" | "number" | "operator";
	onClick: () => void;
	active?: boolean;
}) {
	const toneClass =
		tone === "operator"
			? active
				? "bg-white text-[#ff9f0a]"
				: "bg-[#ff9f0a] text-white hover:bg-[#ffae2d]"
			: tone === "utility"
				? "bg-[#a5a5a8] text-[#1f2023] hover:bg-[#b7b7ba]"
				: "bg-[#333438] text-white hover:bg-[#3c3d42]";

	return (
		<button
			type="button"
			onClick={onClick}
			className={[
				"flex h-[72px] items-center justify-center rounded-full text-[30px] font-medium transition",
				toneClass,
			].join(" ")}
		>
			{label}
		</button>
	);
}
