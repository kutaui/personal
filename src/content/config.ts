import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		tags: z.array(z.string()),
		published: z.boolean(),
	}),
})

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z.string(),
		source: z.string().url(),
		live: z.string().url(),
		date: z.coerce.date(),
	}),
})

export const collections = { blog, projects }
