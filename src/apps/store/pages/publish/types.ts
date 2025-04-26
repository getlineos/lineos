import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

export const appSubmissionSchema = z.object({
	// App Info
	name: z.string().min(1, "App name is required"),
	description: z.string().min(1, "Description is required"),
	category: z.string().min(1, "Primary category is required"),
	subcategory: z.string().optional(),
	supportUrl: z.string().url("Must be a valid URL").optional(),
	privacyUrl: z.string().url("Must be a valid URL").optional(),
	contactEmail: z.string().email("Must be a valid email").optional(),
	appUrl: z.string().url("Must be a valid URL"),
	icon: z.string().min(1, "App icon is required"),
});

export type AppSubmissionForm = z.infer<typeof appSubmissionSchema>;

export interface FormProps {
	form: UseFormReturn<AppSubmissionForm>;
}
