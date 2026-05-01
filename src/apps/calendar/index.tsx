import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, ListFilter, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type CalendarSource = {
	id: string;
	name: string;
	color: string;
	enabled: boolean;
};

type CalendarEvent = {
	id: string;
	title: string;
	start: string;
	end: string;
	sourceId: string;
	location?: string;
	notes?: string;
};

type EventFormState = {
	title: string;
	date: string;
	startTime: string;
	endTime: string;
	sourceId: string;
	location: string;
	notes: string;
};

const STORAGE_KEY = "lineos-calendar-events";
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const initialSources: CalendarSource[] = [
	{ id: "lineos", name: "LineOS", color: "#2563eb", enabled: true },
	{ id: "product", name: "Product", color: "#f97316", enabled: true },
	{ id: "personal", name: "Personal", color: "#10b981", enabled: true },
];

function buildSeedEvents(today: dayjs.Dayjs): CalendarEvent[] {
	const monthStart = today.startOf("month");

	return [
		{
			id: "ship-review",
			title: "LineOS release review",
			start: monthStart.date(3).hour(10).minute(0).toISOString(),
			end: monthStart.date(3).hour(11).minute(0).toISOString(),
			sourceId: "lineos",
			location: "Design Studio",
			notes: "Review desktop shell polish, dock interactions, and open release blockers.",
		},
		{
			id: "infra-sync",
			title: "Infrastructure sync",
			start: monthStart.date(7).hour(13).minute(30).toISOString(),
			end: monthStart.date(7).hour(14).minute(15).toISOString(),
			sourceId: "product",
			location: "Huddle room",
		},
		{
			id: "focus-block",
			title: "Focus block",
			start: monthStart.date(11).hour(9).minute(0).toISOString(),
			end: monthStart.date(11).hour(12).minute(0).toISOString(),
			sourceId: "lineos",
		},
		{
			id: "coffee",
			title: "Coffee with Mina",
			start: monthStart.date(14).hour(16).minute(0).toISOString(),
			end: monthStart.date(14).hour(17).minute(0).toISOString(),
			sourceId: "personal",
			location: "North Market",
		},
		{
			id: "planning",
			title: "Quarter planning",
			start: monthStart.date(18).hour(11).minute(0).toISOString(),
			end: monthStart.date(18).hour(12).minute(30).toISOString(),
			sourceId: "product",
			location: "War room",
		},
		{
			id: "design-crit",
			title: "Design critique",
			start: monthStart.date(18).hour(15).minute(0).toISOString(),
			end: monthStart.date(18).hour(16).minute(0).toISOString(),
			sourceId: "lineos",
		},
		{
			id: "workout",
			title: "Workout class",
			start: monthStart.date(22).hour(18).minute(30).toISOString(),
			end: monthStart.date(22).hour(19).minute(30).toISOString(),
			sourceId: "personal",
			location: "Pulse Club",
		},
		{
			id: "demo-day",
			title: "Product demo day",
			start: monthStart.date(26).hour(14).minute(0).toISOString(),
			end: monthStart.date(26).hour(16).minute(0).toISOString(),
			sourceId: "product",
			location: "Main stage",
		},
		{
			id: "roadmap",
			title: "Roadmap write-up",
			start: monthStart.date(27).hour(9).minute(30).toISOString(),
			end: monthStart.date(27).hour(10).minute(30).toISOString(),
			sourceId: "lineos",
		},
	];
}

function createDefaultForm(date: dayjs.Dayjs, sourceId = initialSources[0].id): EventFormState {
	return {
		title: "",
		date: date.format("YYYY-MM-DD"),
		startTime: "09:00",
		endTime: "10:00",
		sourceId,
		location: "",
		notes: "",
	};
}

function toFormState(event: CalendarEvent): EventFormState {
	const start = dayjs(event.start);
	const end = dayjs(event.end);

	return {
		title: event.title,
		date: start.format("YYYY-MM-DD"),
		startTime: start.format("HH:mm"),
		endTime: end.format("HH:mm"),
		sourceId: event.sourceId,
		location: event.location ?? "",
		notes: event.notes ?? "",
	};
}

function loadStoredEvents(today: dayjs.Dayjs) {
	if (typeof window === "undefined") {
		return buildSeedEvents(today);
	}

	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (!stored) {
		return buildSeedEvents(today);
	}

	try {
		const parsed = JSON.parse(stored);
		return Array.isArray(parsed) && parsed.length ? parsed : buildSeedEvents(today);
	} catch {
		return buildSeedEvents(today);
	}
}

export default function CalendarApp() {
	const today = dayjs();
	const [sources, setSources] = useState(initialSources);
	const [currentMonth, setCurrentMonth] = useState(today.startOf("month"));
	const [selectedDate, setSelectedDate] = useState(today.startOf("day"));
	const [events, setEvents] = useState<CalendarEvent[]>(() => loadStoredEvents(today));
	const [isEditorOpen, setIsEditorOpen] = useState(false);
	const [editingEventId, setEditingEventId] = useState<string | null>(null);
	const [formState, setFormState] = useState<EventFormState>(() =>
		createDefaultForm(today.startOf("day")),
	);
	const [formError, setFormError] = useState("");

	useEffect(() => {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
	}, [events]);

	const sourceMap = useMemo(
		() => new Map(sources.map((source) => [source.id, source])),
		[sources],
	);

	const activeSourceIds = useMemo(
		() => new Set(sources.filter((source) => source.enabled).map((source) => source.id)),
		[sources],
	);

	const visibleEvents = useMemo(
		() => events.filter((event) => activeSourceIds.has(event.sourceId)),
		[activeSourceIds, events],
	);

	const monthDays = useMemo(() => {
		const start = currentMonth.startOf("month").startOf("week");
		const end = currentMonth.endOf("month").endOf("week");
		const days: dayjs.Dayjs[] = [];
		let cursor = start;

		while (cursor.isBefore(end) || cursor.isSame(end, "day")) {
			days.push(cursor);
			cursor = cursor.add(1, "day");
		}

		return days;
	}, [currentMonth]);

	const eventsByDay = useMemo(() => {
		const grouped = new Map<string, CalendarEvent[]>();

		for (const event of visibleEvents) {
			const key = dayjs(event.start).format("YYYY-MM-DD");
			const items = grouped.get(key) ?? [];
			items.push(event);
			grouped.set(key, items);
		}

		for (const items of grouped.values()) {
			items.sort(
				(left, right) =>
					dayjs(left.start).valueOf() - dayjs(right.start).valueOf(),
			);
		}

		return grouped;
	}, [visibleEvents]);

	const selectedKey = selectedDate.format("YYYY-MM-DD");
	const selectedEvents = eventsByDay.get(selectedKey) ?? [];
	const upcomingEvents = visibleEvents
		.filter((event) => dayjs(event.end).isAfter(today))
		.sort((left, right) => dayjs(left.start).valueOf() - dayjs(right.start).valueOf())
		.slice(0, 4);

	const openCreateDialog = (date = selectedDate) => {
		setEditingEventId(null);
		setFormError("");
		setFormState(createDefaultForm(date.startOf("day")));
		setIsEditorOpen(true);
	};

	const openEditDialog = (event: CalendarEvent) => {
		setEditingEventId(event.id);
		setFormError("");
		setFormState(toFormState(event));
		setIsEditorOpen(true);
	};

	const selectDate = (date: dayjs.Dayjs) => {
		setSelectedDate(date.startOf("day"));
		if (!date.isSame(currentMonth, "month")) {
			setCurrentMonth(date.startOf("month"));
		}
	};

	const handleSubmitEvent = () => {
		if (!formState.title.trim()) {
			setFormError("Add a title to save this event.");
			return;
		}

		const start = dayjs(`${formState.date}T${formState.startTime}`);
		const end = dayjs(`${formState.date}T${formState.endTime}`);

		if (!start.isValid() || !end.isValid()) {
			setFormError("Choose a valid date and time.");
			return;
		}

		if (!end.isAfter(start)) {
			setFormError("End time must be after start time.");
			return;
		}

		const nextEvent: CalendarEvent = {
			id: editingEventId ?? crypto.randomUUID(),
			title: formState.title.trim(),
			start: start.toISOString(),
			end: end.toISOString(),
			sourceId: formState.sourceId,
			location: formState.location.trim() || undefined,
			notes: formState.notes.trim() || undefined,
		};

		setEvents((current) => {
			if (editingEventId) {
				return current.map((event) =>
					event.id === editingEventId ? nextEvent : event,
				);
			}

			return [...current, nextEvent];
		});

		selectDate(start);
		setIsEditorOpen(false);
	};

	const handleDeleteEvent = () => {
		if (!editingEventId) {
			return;
		}

		setEvents((current) => current.filter((event) => event.id !== editingEventId));
		setIsEditorOpen(false);
	};

	return (
		<div className="h-full overflow-hidden bg-[#f5f6fa] text-slate-900">
			<div className="grid h-full grid-cols-[280px_minmax(0,1fr)]">
				<aside className="flex h-full flex-col border-r border-slate-200 bg-white/80 backdrop-blur-xl">
					<div className="border-b border-slate-200 px-6 py-5">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">
									Calendar
								</p>
								<h1 className="mt-2 text-2xl font-semibold">
									{selectedDate.format("dddd")}
								</h1>
								<p className="text-sm text-slate-500">
									{selectedDate.format("D MMMM YYYY")}
								</p>
							</div>
							<button
								type="button"
								onClick={() => openCreateDialog()}
								className="rounded-2xl bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
							>
								<Plus className="mr-1 inline h-4 w-4" />
								New
							</button>
						</div>
					</div>

					<div className="px-6 py-5">
						<div className="rounded-[24px] bg-slate-100 p-4">
							<div className="mb-3 flex items-center justify-between">
								<h2 className="text-sm font-semibold text-slate-700">
									{currentMonth.format("MMMM YYYY")}
								</h2>
								<button
									type="button"
									onClick={() => {
										setCurrentMonth(today.startOf("month"));
										selectDate(today.startOf("day"));
									}}
									className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600"
								>
									Today
								</button>
							</div>
							<div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
								{weekDays.map((day) => (
									<div key={day}>{day[0]}</div>
								))}
							</div>
							<div className="grid grid-cols-7 gap-1">
								{monthDays.map((day) => {
									const isSelected = day.isSame(selectedDate, "day");
									const isToday = day.isSame(today, "day");
									const isCurrentMonth = day.isSame(currentMonth, "month");

									return (
										<button
											key={day.toISOString()}
											type="button"
											onClick={() => selectDate(day)}
											className={[
												"flex aspect-square items-center justify-center rounded-full text-sm transition",
												isSelected
													? "bg-slate-900 text-white"
													: isToday
														? "bg-red-500 text-white"
														: isCurrentMonth
															? "text-slate-700 hover:bg-white"
															: "text-slate-300 hover:bg-white/70",
											].join(" ")}
										>
											{day.date()}
										</button>
									);
								})}
							</div>
						</div>
					</div>

					<div className="flex-1 overflow-y-auto px-6 pb-6">
						<div>
							<h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
								Calendars
							</h2>
							<div className="mt-4 space-y-3">
								{sources.map((source) => (
									<label
										key={source.id}
										className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-100 px-4 py-3"
									>
										<div className="flex items-center gap-3">
											<span
												className="h-3 w-3 rounded-full"
												style={{ backgroundColor: source.color }}
											/>
											<span className="font-medium text-slate-700">
												{source.name}
											</span>
										</div>
										<input
											type="checkbox"
											checked={source.enabled}
											onChange={() =>
												setSources((current) =>
													current.map((item) =>
														item.id === source.id
															? { ...item, enabled: !item.enabled }
															: item,
													),
												)
											}
											className="h-4 w-4 accent-slate-900"
										/>
									</label>
								))}
							</div>
						</div>

						<div className="mt-8">
							<h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
								Coming Up
							</h2>
							<div className="mt-4 space-y-3">
								{upcomingEvents.length ? (
									upcomingEvents.map((event) => {
										const source = sourceMap.get(event.sourceId);
										return (
											<button
												key={event.id}
												type="button"
												onClick={() => {
													selectDate(dayjs(event.start));
													openEditDialog(event);
												}}
												className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-slate-300 hover:shadow-sm"
											>
												<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
													<span
														className="h-2.5 w-2.5 rounded-full"
														style={{ backgroundColor: source?.color }}
													/>
													{dayjs(event.start).format("ddd, D MMM")}
												</div>
												<h3 className="mt-2 text-sm font-semibold text-slate-800">
													{event.title}
												</h3>
												<p className="mt-1 text-sm text-slate-500">
													{formatEventTime(event)}
												</p>
											</button>
										);
									})
								) : (
									<div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">
										No upcoming events in the visible calendars.
									</div>
								)}
							</div>
						</div>
					</div>
				</aside>

				<section className="flex h-full min-w-0 flex-col">
					<div className="flex items-center justify-between border-b border-slate-200 bg-white/70 px-8 py-5 backdrop-blur-xl">
						<div>
							<h2 className="text-3xl font-semibold tracking-tight">
								{currentMonth.format("MMMM YYYY")}
							</h2>
							<p className="mt-1 text-sm text-slate-500">
								Monthly overview with agenda details
							</p>
						</div>

						<div className="flex items-center gap-3">
							<div className="flex items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
								<button
									type="button"
									onClick={() => setCurrentMonth((month) => month.subtract(1, "month"))}
									className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100"
								>
									<ChevronLeft className="h-5 w-5" />
								</button>
								<button
									type="button"
									onClick={() => {
										setCurrentMonth(today.startOf("month"));
										selectDate(today.startOf("day"));
									}}
									className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
								>
									Today
								</button>
								<button
									type="button"
									onClick={() => setCurrentMonth((month) => month.add(1, "month"))}
									className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100"
								>
									<ChevronRight className="h-5 w-5" />
								</button>
							</div>
							<div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm">
								<ListFilter className="h-4 w-4" />
								Month
							</div>
						</div>
					</div>

					<div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_320px]">
						<div className="flex min-w-0 flex-col">
							<div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
								{weekDays.map((day) => (
									<div
										key={day}
										className="px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
									>
										{day}
									</div>
								))}
							</div>
							<div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-6">
								{monthDays.map((day) => {
									const dayKey = day.format("YYYY-MM-DD");
									const dayEvents = eventsByDay.get(dayKey) ?? [];
									const isSelected = day.isSame(selectedDate, "day");
									const isToday = day.isSame(today, "day");
									const isCurrentMonth = day.isSame(currentMonth, "month");

									return (
										<button
											key={dayKey}
											type="button"
											onClick={() => selectDate(day)}
											onDoubleClick={() => openCreateDialog(day)}
											className={[
												"flex min-h-[112px] flex-col gap-2 border-b border-r border-slate-200 px-3 py-3 text-left transition",
												isSelected ? "bg-blue-50/80" : "bg-white hover:bg-slate-50",
											].join(" ")}
										>
											<div className="flex items-center justify-between">
												<span
													className={[
														"flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
														isToday
															? "bg-red-500 text-white"
															: isCurrentMonth
																? "text-slate-900"
																: "text-slate-300",
													].join(" ")}
												>
													{day.date()}
												</span>
												{dayEvents.length > 0 && (
													<span className="text-xs font-medium text-slate-400">
														{dayEvents.length} item{dayEvents.length > 1 ? "s" : ""}
													</span>
												)}
											</div>

											<div className="space-y-1.5">
												{dayEvents.slice(0, 3).map((event) => {
													const source = sourceMap.get(event.sourceId);
													return (
														<div
															key={event.id}
															onClick={(eventClick) => {
																eventClick.stopPropagation();
																openEditDialog(event);
															}}
															className="truncate rounded-xl px-2 py-1 text-xs font-medium text-white"
															style={{ backgroundColor: source?.color ?? "#475569" }}
														>
															{dayjs(event.start).format("HH:mm")} {event.title}
														</div>
													);
												})}
												{dayEvents.length > 3 && (
													<div className="text-xs font-medium text-slate-400">
														+{dayEvents.length - 3} more
													</div>
												)}
											</div>
										</button>
									);
								})}
							</div>
						</div>

						<div className="border-l border-slate-200 bg-white/80 px-6 py-6 backdrop-blur-xl">
							<div className="rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-[0_30px_80px_rgba(15,23,42,0.22)]">
								<p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
									Selected Day
								</p>
								<h3 className="mt-3 text-3xl font-semibold">
									{selectedDate.format("D")}
								</h3>
								<p className="mt-1 text-sm text-white/60">
									{selectedDate.format("dddd, MMMM YYYY")}
								</p>
								<button
									type="button"
									onClick={() => openCreateDialog(selectedDate)}
									className="mt-5 rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
								>
									Add event
								</button>
							</div>

							<div className="mt-6">
								<h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
									Agenda
								</h3>
								<div className="mt-4 space-y-3">
									{selectedEvents.length ? (
										selectedEvents.map((event) => {
											const source = sourceMap.get(event.sourceId);
											return (
												<article
													key={event.id}
													className="rounded-[24px] border border-slate-200 bg-white px-4 py-4 shadow-sm"
												>
													<div className="flex items-start justify-between gap-3">
														<div>
															<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
																<span
																	className="h-2.5 w-2.5 rounded-full"
																	style={{ backgroundColor: source?.color }}
																/>
																{source?.name}
															</div>
															<h4 className="mt-3 text-base font-semibold text-slate-900">
																{event.title}
															</h4>
														</div>
														<button
															type="button"
															onClick={() => openEditDialog(event)}
															className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100"
														>
															<Pencil className="h-4 w-4" />
														</button>
													</div>
													<p className="mt-2 text-sm text-slate-500">
														{formatEventTime(event)}
													</p>
													{event.location && (
														<p className="mt-1 text-sm text-slate-500">
															{event.location}
														</p>
													)}
													{event.notes && (
														<p className="mt-3 text-sm leading-6 text-slate-600">
															{event.notes}
														</p>
													)}
												</article>
											);
										})
									) : (
										<div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
											<h4 className="text-base font-semibold text-slate-800">
												No events scheduled
											</h4>
											<p className="mt-2 text-sm text-slate-500">
												Create something for this day and it will appear here.
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			<Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
				<DialogContent className="max-w-xl rounded-[28px] border-slate-200 bg-white p-0">
					<div className="border-b border-slate-200 px-6 py-5">
						<DialogHeader>
							<DialogTitle>
								{editingEventId ? "Edit event" : "New event"}
							</DialogTitle>
							<DialogDescription>
								Save appointments directly in LineOS Calendar. Changes stay in local storage.
							</DialogDescription>
						</DialogHeader>
					</div>

					<div className="space-y-4 px-6 py-5">
						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-700">Title</label>
							<Input
								value={formState.title}
								onChange={(event) =>
									setFormState((current) => ({
										...current,
										title: event.target.value,
									}))
								}
								placeholder="Project kickoff"
							/>
						</div>

						<div className="grid grid-cols-3 gap-3">
							<div className="space-y-2">
								<label className="text-sm font-medium text-slate-700">Date</label>
								<Input
									type="date"
									value={formState.date}
									onChange={(event) =>
										setFormState((current) => ({
											...current,
											date: event.target.value,
										}))
									}
								/>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium text-slate-700">Start</label>
								<Input
									type="time"
									value={formState.startTime}
									onChange={(event) =>
										setFormState((current) => ({
											...current,
											startTime: event.target.value,
										}))
									}
								/>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium text-slate-700">End</label>
								<Input
									type="time"
									value={formState.endTime}
									onChange={(event) =>
										setFormState((current) => ({
											...current,
											endTime: event.target.value,
										}))
									}
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<div className="space-y-2">
								<label className="text-sm font-medium text-slate-700">Calendar</label>
								<select
									value={formState.sourceId}
									onChange={(event) =>
										setFormState((current) => ({
											...current,
											sourceId: event.target.value,
										}))
									}
									className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
								>
									{sources.map((source) => (
										<option key={source.id} value={source.id}>
											{source.name}
										</option>
									))}
								</select>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium text-slate-700">Location</label>
								<Input
									value={formState.location}
									onChange={(event) =>
										setFormState((current) => ({
											...current,
											location: event.target.value,
										}))
									}
									placeholder="Studio, call, cafe..."
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-700">Notes</label>
							<Textarea
								value={formState.notes}
								onChange={(event) =>
									setFormState((current) => ({
										...current,
										notes: event.target.value,
									}))
								}
								rows={4}
								placeholder="Agenda, links, or context for this event"
							/>
						</div>

						{formError && (
							<div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
								{formError}
							</div>
						)}
					</div>

					<DialogFooter className="border-t border-slate-200 px-6 py-5 sm:justify-between">
						<div>
							{editingEventId ? (
								<button
									type="button"
									onClick={handleDeleteEvent}
									className="inline-flex items-center gap-2 rounded-2xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
								>
									<Trash2 className="h-4 w-4" />
									Delete
								</button>
							) : null}
						</div>
						<div className="flex flex-col-reverse gap-2 sm:flex-row">
							<button
								type="button"
								onClick={() => setIsEditorOpen(false)}
								className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleSubmitEvent}
								className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
							>
								{editingEventId ? "Save changes" : "Create event"}
							</button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

function formatEventTime(event: CalendarEvent) {
	return `${dayjs(event.start).format("HH:mm")} - ${dayjs(event.end).format("HH:mm")}`;
}
