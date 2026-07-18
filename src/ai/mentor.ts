import { mentorSystemPrompt } from './prompts';
import type { Profile } from '../types';
const demoReply = (question: string, profile: Profile) => `You’re closer than it feels. With ${profile.hours} a day, I’d protect your momentum: spend 70% building and 30% learning. For your next session, choose one tiny outcome related to “${question.slice(0, 55)}” — then ship it before looking for another tutorial.\n\nFor ${profile.domain}, I’d start with a focused 2-week sprint: build one small feature daily, write down each blocker, and use the community recommendations when you’re stuck for more than 30 minutes.`;
export async function askMentor(question: string, profile: Profile) {
 const key = import.meta.env.VITE_OPENAI_API_KEY;
 if (!key) { await new Promise(r => setTimeout(r, 700)); return demoReply(question, profile); }
 const res = await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},body:JSON.stringify({model:import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',messages:[{role:'system',content:mentorSystemPrompt(profile)},{role:'user',content:question}],temperature:.7})});
 if (!res.ok) throw new Error('Your mentor is taking a short break. Please try again.');
 const data = await res.json(); return data.choices[0]?.message?.content || 'Let’s try that once more.';
}
