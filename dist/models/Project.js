"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Please provide project title"],
        trim: true,
    },
    image: {
        type: String,
        required: [true, "Please provide image url"],
    },
    github: {
        type: String,
        required: [true, "Please provide github link"],
    },
    demo: {
        type: String,
        required: [true, "Please provide demo link"],
    },
    description: {
        type: String,
        required: [true, "Please provide description"],
    },
    stack: {
        type: [String],
        require: true,
    },
}, { timestamps: true });
