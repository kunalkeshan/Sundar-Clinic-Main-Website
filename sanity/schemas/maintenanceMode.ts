import { defineField, defineType } from "sanity";
import { baseLanguage } from "../lib/locale";

export default defineType({
  name: "maintenance-mode",
  title: "Maintenance Mode",
  type: "document",
  fields: [
    defineField({
      name: "isMaintenanceMode",
      title: "Is Maintenance Mode",
      type: "boolean",
      description: "Whether the site is in maintenance mode.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "maintenanceMessage",
      title: "Maintenance Message",
      type: "localeText",
      description:
        "The message to display to users when the site is in maintenance mode.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "disableMaintenanceModeBy",
      title: "Disable Maintenance Mode By",
      type: "datetime",
      description: "The date and time the maintenance mode will be disabled.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      subtitle: `maintenanceMessage.${baseLanguage?.id}`,
    },
    prepare({ subtitle }) {
      return {
        title: "Maintenance Mode",
        subtitle,
      };
    },
  },
});
