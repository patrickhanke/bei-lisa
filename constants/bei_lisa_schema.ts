// recreate query hooks after making changes in this file
// using the script in scripts/generateQueries.ts
// then recreate types in codegen

// reset Cache is not necessary

export const bei_lisa_schema = [
    {
        name: "Entry",
        keys: [
            "objectId",
            "categories",
            "label",
            "title",
            "createdAt",
            "text",
            "link",
            "file",
            "image",
            "description",
            "documents"
        ]
    },
    {
        name: "Image",
        keys: [
            "objectId",
            "categories",
            "label",
            "title",
            "createdAt",
            "text",
            "date",
            "state",
            "connected_elements",
            "file"
        ]
    },
    {
        name: "Person",
        keys: [
            "objectId",
            "label",
            "title",
            "createdAt",
            "text",
            "portrait",
        ]
    },
    {
        name: "Category",
        keys: [
            "objectId",
            "label",
            "title",
            "createdAt",
        ]
    }
];
