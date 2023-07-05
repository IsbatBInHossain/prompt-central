import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

// GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt) {
      return new Response('Prompt not found', { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch the prompt', { status: 500 });
  }
};

// PATCH

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const oldPrompt = await Prompt.findById(params.id);
    if (!oldPrompt) {
      return new Response('Prompt not found', { status: 404 });
    }
    oldPrompt.prompt = prompt;
    oldPrompt.tag = tag;

    oldPrompt.save();

    return new Response(JSON.stringify(oldPrompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch the prompt', { status: 500 });
  }
};

// DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response('Prompt Deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete the prompt', { status: 500 });
  }
};
