/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\app\studio\[[...index]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";
import { PlugIcon } from "lucide-react";

const EXCLUDED_TYPES = [
  "maintenance-mode",
  "localeString",
  "localeText",
  "blockContent",
  "localeBlockContent",
];

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    deskTool({
      structure(S, context) {
        return S.list()
          .title("Sanity Love Content")
          .items([
            ...schema.types
              .filter((type) => !EXCLUDED_TYPES.includes(type.name))
              .map((type) =>
                S.documentTypeListItem(type.name).title(type.title || type.name)
              ),
            S.listItem()
              .id("maintenance-mode")
              .schemaType("maintenance-mode")
              .title("Maintenance Mode")
              .icon(PlugIcon)
              .child(
                S.editor()
                  .id("maintenance-mode")
                  .schemaType("maintenance-mode")
                  .documentId("maintenance-mode")
              ),
          ]);
      },
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
