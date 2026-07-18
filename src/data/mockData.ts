import type { Recommendation } from '../types';
export const domains = ['Frontend Development','Backend Development','UI / UX Design','Graphic Design','AI / Machine Learning','DevOps','Cyber Security','Stock Market','Video Editing'];
export const goals = ['Land a job','Start freelancing','Ace college','Build a startup','Prepare for interviews'];
export const stats = [{label:'Current streak',value:'12',suffix:' days',icon:'Flame'},{label:'Lessons complete',value:'24',suffix:' / 36',icon:'CheckCircle2'},{label:'Learning hours',value:'18.5',suffix:' h',icon:'Clock'},{label:'Roadmap progress',value:'67',suffix:'%',icon:'TrendingUp'}];
export const weeklyProgress = [{day:'Mon',hours:1.5},{day:'Tue',hours:2.2},{day:'Wed',hours:1.1},{day:'Thu',hours:2.8},{day:'Fri',hours:1.8},{day:'Sat',hours:3.2},{day:'Sun',hours:2.4}];
export const roadmap = [
 {week:'Week 01',title:'Build your foundation',progress:100,tasks:['Modern HTML semantics','CSS layouts & responsive design','JavaScript fundamentals']},
 {week:'Week 02',title:'Think in components',progress:72,tasks:['React fundamentals','State and events','Build a task tracker']},
 {week:'Week 03',title:'Ship a real experience',progress:0,tasks:['Routing and data fetching','Styling systems','Deploy your portfolio']}
];
export const recommendations: Recommendation[] = [
 {name:'Frontend Mentor',type:'Challenge platform',description:'Structured, realistic challenges make it ideal for turning concepts into portfolio-worthy practice.',href:'https://www.frontendmentor.io/',icon:'Sparkles'},
 {name:'Reactiflux',type:'Discord community',description:'A focused, highly active React community where practical questions get thoughtful answers.',href:'https://www.reactiflux.com/',icon:'MessageCircle'},
 {name:'The Odin Project',type:'Learning path',description:'A project-first curriculum that creates a clear, no-fluff path from foundations to employable skills.',href:'https://www.theodinproject.com/',icon:'BookOpen'},
 {name:'Web Dev Simplified',type:'YouTube channel',description:'Clear visual explanations and concise videos are perfect when you have limited study time.',href:'https://www.youtube.com/@WebDevSimplified',icon:'Play'},
 {name:'roadmap.sh',type:'Roadmap & community',description:'Use its visual maps to see the bigger picture and avoid learning topics in the wrong order.',href:'https://roadmap.sh/',icon:'Map'}
];
export const projects = [
 {level:'Beginner',title:'FocusFlow',desc:'A calm, keyboard-first Pomodoro timer with local session history.',skills:['React state','Local storage','Accessible UI'],color:'purple'},
 {level:'Intermediate',title:'PulseBoard',desc:'A personal analytics dashboard powered by a public data API.',skills:['API integration','Data charts','Loading states'],color:'cyan'},
 {level:'Advanced',title:'CollabCanvas',desc:'A real-time creative workspace built for focused team ideation.',skills:['WebSockets','System design','Complex UI'],color:'orange'}
];
