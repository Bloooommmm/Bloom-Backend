const json = (schema: Record<string, unknown>) => ({
  "application/json": { schema },
});

const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` });

const success = (schema: Record<string, unknown>, description: string) => ({
  description,
  content: json(schema),
});

const errorResponse = (description: string) => ({
  description,
  content: {
    "application/json": {
      schema: ref("ErrorResponse"),
      example: { success: false, message: description },
    },
  },
});

const serverError = { "500": errorResponse("Internal Server Error") };

export const openapiDocument = {
  openapi: "3.1.0",
  info: {
    title: "Bloom API",
    version: "1.0.0",
    description:
      "REST API for Bloom: profiles, cycle education, and AI insights. Firebase ID token is required for /api/users/me. The endpoint creates or updates the current user profile. Swagger describes supported payloads; it does not add runtime validation. Malformed JSON and unexpected provider/database failures currently return 500.",
    contact: {
      name: "Bloom Team",
      url: "https://github.com/Bloooommmm/Bloom-Backend",
    },
  },
  servers: [
    { url: "/", description: "Current API host" },
  ],
  security: [],
  tags: [
    { name: "Health", description: "Service health checks" },
    { name: "Users", description: "User profile operations" },
    { name: "Lessons", description: "Cycle education content" },
    { name: "AI", description: "Supportive cycle insight generation" },
    { name: "Tracking", description: "Authenticated period and mood records" },
  ],
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Check API health",
        operationId: "getHealth",
        description: "Liveness only; does not query PostgreSQL or Groq.",
        responses: {
          "200": success(ref("HealthResponse"), "The API is available."),
        },
      },
    },
    "/api/users/me": {
      get: {
        tags: ["Users"],
        summary: "Get or create current Firebase user profile",
        operationId: "getCurrentUser",
        security: [{ firebaseBearer: [] }],
        responses: {
          "200": success(ref("UserResponse"), "Current user profile returned."),
          "401": errorResponse("Invalid or expired Firebase token"),
          ...serverError,
        },
      },
    },
    "/api/tracking/periods": {
      get: { tags: ["Tracking"], summary: "List current user's period records", operationId: "listPeriods", security: [{ firebaseBearer: [] }], responses: { "200": success({ type: "object" }, "Period records returned."), "401": errorResponse("Invalid or expired Firebase token"), ...serverError } },
      post: { tags: ["Tracking"], summary: "Record a period", operationId: "createPeriod", security: [{ firebaseBearer: [] }], requestBody: { required: true, content: json({ type: "object", required: ["startDate"], properties: { startDate: { type: "string", format: "date" }, endDate: { type: "string", format: "date" } } }) }, responses: { "201": success({ type: "object" }, "Period recorded."), "400": errorResponse("A valid date is required"), "401": errorResponse("Invalid or expired Firebase token"), ...serverError } },
    },
    "/api/tracking/moods": {
      get: { tags: ["Tracking"], summary: "List current user's moods", operationId: "listMoods", security: [{ firebaseBearer: [] }], responses: { "200": success({ type: "object" }, "Mood records returned."), "401": errorResponse("Invalid or expired Firebase token"), ...serverError } },
      put: { tags: ["Tracking"], summary: "Record a daily mood", operationId: "upsertMood", security: [{ firebaseBearer: [] }], requestBody: { required: true, content: json({ type: "object", required: ["mood", "loggedAt"], properties: { mood: { type: "string" }, note: { type: "string" }, loggedAt: { type: "string", format: "date" } } }) }, responses: { "200": success({ type: "object" }, "Mood recorded."), "400": errorResponse("Mood is required"), "401": errorResponse("Invalid or expired Firebase token"), ...serverError } },
    },
    "/api/lessons": {
      post: {
        tags: ["Lessons"],
        summary: "Create a lesson",
        operationId: "createLesson",
        description: "Title and content must contain non-whitespace text. Generates slug from title with a timestamp suffix. Read time is ceil(word count / 200), minimum 1 minute. Published by default; only literal false creates a draft.",
        requestBody: {
          required: true,
          content: json(ref("CreateLessonRequest")),
        },
        responses: {
          "201": success(ref("LessonResponse"), "Lesson created."),
          "400": {
            description: "Title or content is missing, blank, or not a string.",
            content: { "application/json": { schema: ref("ErrorResponse"), examples: {
              title: { value: { success: false, message: "A lesson title is required" } },
              content: { value: { success: false, message: "Lesson content is required" } },
            } } },
          },
          "409": errorResponse("Resource already exists"),
          ...serverError,
        },
      },
      get: {
        tags: ["Lessons"],
        summary: "List lessons",
        operationId: "listLessons",
        description: "Newest first. Published lessons by default; only all=true includes drafts. No pagination; meta.total is the returned array length.",
        parameters: [{ $ref: "#/components/parameters/AllLessons" }],
        responses: {
          "200": success(ref("LessonListResponse"), "Lessons returned."),
          ...serverError,
        },
      },
    },
    "/api/lessons/{identifier}": {
      parameters: [
        {
          name: "identifier",
          in: "path",
          required: true,
          description: "A lesson slug for GET, or a lesson ID for PATCH and DELETE.",
          schema: { type: "string", example: "period-cramps-101-what-is-actually-going-on" },
        },
      ],
      get: {
        tags: ["Lessons"],
        summary: "Get a lesson by slug",
        operationId: "getLessonBySlug",
        description: "Use the slug, not the ID. This lookup also returns unpublished lessons.",
        responses: {
          "200": success(ref("LessonResponse"), "Lesson returned."),
          "404": errorResponse("Lesson is not found"),
          ...serverError,
        },
      },
      patch: {
        tags: ["Lessons"],
        summary: "Update a lesson",
        operationId: "updateLesson",
        description: "Use the lesson ID, not the slug. Updates supplied title/content/isPublished only; slug stays unchanged. Content changes recalculate read time. Empty objects are accepted.",
        parameters: [{ name: "identifier", in: "path", required: true, description: "Lesson ID returned by a list or create response.", schema: { type: "string", example: "cmwitgzpp000314uom7iohbjr" } }],
        requestBody: {
          required: true,
          content: json(ref("UpdateLessonRequest")),
        },
        responses: {
          "200": success(ref("LessonResponse"), "Lesson updated."),
          "400": errorResponse("A lesson title is required"),
          "404": errorResponse("Resource is not found"),
          ...serverError,
        },
      },
      delete: {
        tags: ["Lessons"],
        summary: "Delete a lesson",
        operationId: "deleteLesson",
        description: "Use the lesson ID, not the slug. Deletes permanently and returns an empty body.",
        parameters: [{ name: "identifier", in: "path", required: true, description: "Lesson ID returned by a list or create response.", schema: { type: "string", example: "cmwitgzpp000314uom7iohbjr" } }],
        responses: {
          "204": { description: "Lesson deleted." },
          "404": errorResponse("Resource is not found"),
          ...serverError,
        },
      },
    },
    "/api/ai/insight": {
      post: {
        tags: ["AI"],
        summary: "Generate a cycle insight",
        description:
          "Calls Groq using the server's GROQ_API_KEY and llama-3.3-70b-versatile. Never send a provider key in this request. Mood and symptoms must be truthy; use the documented string/string-array payloads. The model is prompted for the Insight fields but its JSON output is not schema-validated. Results are not persisted. This endpoint does not diagnose medical conditions.",
        operationId: "generateCycleInsight",
        requestBody: {
          required: true,
          content: json(ref("InsightRequest")),
        },
        responses: {
          "200": success(ref("InsightResponse"), "Insight generated."),
          "400": errorResponse("Fields mood and symptoms are required"),
          "502": errorResponse("AI returned an empty response"),
          "503": errorResponse("GROQ_API_KEY is not configured"),
          ...serverError,
        },
      },
    },
  },
  components: {
    securitySchemes: { firebaseBearer: { type: "http", scheme: "bearer", bearerFormat: "Firebase ID token" } },
    parameters: {
      Id: {
        name: "id",
        in: "path",
        required: true,
        description: "Resource ID.",
        schema: { type: "string", example: "cmwitgzpp000314uom7iohbjr" },
      },
      AllLessons: {
        name: "all",
        in: "query",
        required: false,
        description: "Set to true to include unpublished lessons.",
        schema: { type: "boolean", default: false, example: false },
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        required: ["success", "message"],
        properties: {
          success: { type: "boolean", const: false },
          message: { type: "string", example: "Resource is not found" },
          details: { description: "Optional validation or provider details." },
        },
      },
      HealthResponse: {
        type: "object",
        required: ["success", "data"],
        properties: {
          success: { type: "boolean", const: true },
          data: {
            type: "object",
            required: ["status", "service"],
            properties: {
              status: { type: "string", example: "ok" },
              service: { type: "string", example: "bloom-backend" },
            },
          },
        },
      },
      User: {
        type: "object",
        required: ["id", "email", "name", "createdAt", "updatedAt"],
        properties: {
          id: { type: "string", example: "cmwitgzpp000314uom7iohbjr" },
          email: { type: "string", format: "email", example: "luna@example.com" },
          name: { type: ["string", "null"], example: "Luna" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      UserResponse: {
        type: "object",
        required: ["success", "data"],
        properties: { success: { type: "boolean", const: true }, data: ref("User") },
      },
      UserListResponse: {
        type: "object",
        required: ["success", "data", "meta"],
        properties: {
          success: { type: "boolean", const: true },
          data: { type: "array", items: ref("User") },
          meta: { type: "object", properties: { total: { type: "integer", minimum: 0, example: 4 } } },
        },
      },
      CreateUserRequest: {
        type: "object",
        required: ["email"],
        properties: {
          email: { type: "string", format: "email", example: "luna@example.com" },
          name: { type: "string", example: "Luna" },
          password: { type: "string", format: "password", writeOnly: true, example: "temporary-password" },
        },
      },
      UpdateUserRequest: {
        type: "object",
        properties: {
          email: { type: "string", format: "email", example: "new-email@example.com" },
          name: { type: "string", example: "Luna Bloom" },
          password: { type: "string", format: "password", writeOnly: true, example: "new-password" },
        },
      },
      Lesson: {
        type: "object",
        required: ["id", "title", "slug", "content", "estimatedReadTime", "isPublished", "createdAt", "updatedAt"],
        properties: {
          id: { type: "string", example: "cmwitgzpp000314uom7iohbjr" },
          title: { type: "string", example: "Period Cramps 101: What Is Actually Going On?" },
          slug: { type: "string", example: "period-cramps-101-what-is-actually-going-on" },
          content: { type: "string" },
          estimatedReadTime: { type: "integer", minimum: 1, example: 2 },
          isPublished: { type: "boolean", example: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      LessonResponse: {
        type: "object",
        required: ["success", "data"],
        properties: { success: { type: "boolean", const: true }, data: ref("Lesson") },
      },
      LessonListResponse: {
        type: "object",
        required: ["success", "data", "meta"],
        properties: {
          success: { type: "boolean", const: true },
          data: { type: "array", items: ref("Lesson") },
          meta: { type: "object", properties: { total: { type: "integer", minimum: 0, example: 4 } } },
        },
      },
      CreateLessonRequest: {
        type: "object",
        required: ["title", "content"],
        properties: {
          title: { type: "string", minLength: 1, example: "Understanding cycle fatigue" },
          content: { type: "string", minLength: 1, example: "A short, supportive lesson about fatigue." },
          isPublished: { type: "boolean", default: true, example: true },
        },
      },
      UpdateLessonRequest: {
        type: "object",
        properties: {
          title: { type: "string", minLength: 1, example: "Understanding cycle fatigue" },
          content: { type: "string", minLength: 1, example: "Updated lesson content." },
          isPublished: { type: "boolean", example: false },
        },
      },
      InsightRequest: {
        type: "object",
        required: ["mood", "symptoms"],
        properties: {
          mood: { type: "string", minLength: 1, example: "irritable and tired" },
          symptoms: {
            oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
            example: ["cramps", "headache"],
          },
          cyclePhase: { type: "string", example: "menstruation" },
          extraNotes: { type: "string", example: "I have a big exam tomorrow." },
        },
      },
      Insight: {
        type: "object",
        description: "Expected model output. Fields are not guaranteed because the provider JSON is returned without schema validation.",
        properties: {
          validation: { type: "string", example: "It makes sense to feel more sensitive and tired right now." },
          explanation: { type: "string", example: "Hormone changes can affect energy and mood during this phase." },
          actionableTips: { type: "array", items: { type: "string" }, example: ["Drink water", "Try gentle stretching"] },
          encouragement: { type: "string", example: "You are doing your best, and that is enough today." },
        },
      },
      InsightResponse: {
        type: "object",
        required: ["success", "data"],
        properties: { success: { type: "boolean", const: true }, data: ref("Insight") },
      },
    },
  },
} as const;

