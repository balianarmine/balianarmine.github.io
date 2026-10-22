import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, Plus, Minus, Search, X } from 'lucide-react';
import './style.css';

const integrations = [
  { name: 'Notion', letter: 'N', category: 'Knowledge', color: 'ink', description: 'Documents, knowledge bases, and ideas, right in your workflow.' },
  { name: 'Slack', letter: 'S', category: 'Communication', color: 'purple', description: 'Conversations and notifications where your team connects.' },
  { name: 'Google Drive', letter: 'G', category: 'Files', color: 'green', description: 'Files and shared folders for work that needs context.' },
  { name: 'GMail', letter: 'G', category: 'Communication', color: 'ink', description: 'Search for, read, and send emails and attachments to your customers.' },
  { name: 'Google Calendar', letter: 'G', category: 'Management', color: 'blue', description: 'Manage meetings and events within the company.' },
  { name: 'Telegram', letter: 'T', category: 'Communication', color: 'sky', description: 'Messages and updates for your team and customers.' },
];
const categories = ['All integrations', 'Communication', 'Knowledge', 'Files', 'Management'];
const faqs = [
  ['How do connections work?', 'Choose a service, grant the required permissions, and set up your workflow. This is a catalog concept; live connections require integration with each service API.'],
  ['Can I add my own service?', 'Yes, the catalog can accommodate a custom integration. Building it requires access to the service API and a description of the data you want to exchange.'],
  ['What data will be accessible?', 'That depends on the service and the permissions you grant. A live connection should show the requested permissions before authorization so you can choose what to share.'],
];
function App() {
  const [category, setCategory] = useState(categories[0]);
  const [query, setQuery] = useState('');
  const [opened, setOpened] = useState(null);
  const [selected, setSelected] = useState(null);
  const visible = integrations.filter(item => (category === categories[0] || item.category === category) && item.name.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <header className="header wrap"><a className="wordmark" href="#" aria-label="linka — home">linka<span>®</span></a><nav aria-label="Main navigation"><a href="#integrations">Integrations</a><a href="#how">How it works</a><a href="#faq">FAQ</a></nav><a className="header-cta" href="#integrations">Find an integration <ArrowUpRight size={16}/></a></header>
    <main>
      <section className="hero wrap">
        <div className="eyebrow"><span className="dot"/> LESS BUSYWORK. MORE CONNECTIONS.</div>
        <h1>Your tools.<br/>Now <span className="serif">together.</span></h1>
        <p className="hero-copy">Bring your favorite services into one workspace.<br className="desktop"/> Keep ideas moving and your data connected.</p>
        <a className="button" href="#integrations">Explore integrations <ArrowUpRight size={18}/></a>
        <div className="connection" aria-label="Services connected in one workspace"><div className="service-mini notion">N<span>Notion</span></div><div className="service-mini slack">S<span>Slack</span></div><div className="connection-line"/><div className="connection-hub">linka<span>all connected</span></div><div className="connection-line"/><div className="service-mini drive">G<span>Google Drive</span></div><div className="service-mini github">T<span>Telegram</span></div></div>
        <div className="hero-bottom"><span>Familiar tools. New possibilities.</span><span>One place for your connections <span aria-hidden="true">↘</span></span></div>
      </section>
      <section className="catalog wrap" id="integrations">
        <div className="section-top"><div><div className="eyebrow">01 / THE CATALOG</div><h2>Find your <span className="serif">connection.</span></h2></div><p>The tools you already work with.<br/>Choose where to start.</p></div>
        <div className="catalog-toolbar"><div className="filters" role="group" aria-label="Integration categories">{categories.map(value => <button key={value} className={value === category ? 'filter active' : 'filter'} aria-pressed={value === category} onClick={() => setCategory(value)}>{value}</button>)}</div><label className="search"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a service" aria-label="Find a service"/></label></div>
        <div className="cards">{visible.map(item => <button className="card" key={item.name} onClick={() => setSelected(item)} aria-label={`Learn more about ${item.name}`}><div className="card-top"><span className={`monogram ${item.color}`}>{item.letter}</span><span className="tag">{item.category}</span></div><h3>{item.name}</h3><p>{item.description}</p><div className="card-footer">About this integration <ArrowUpRight size={18}/></div></button>)}</div>
        {visible.length === 0 && <div className="empty" role="status">No matching services found. Try another name or category.<button className="filter" onClick={() => { setQuery(''); setCategory(categories[0]); }}>Reset search</button></div>}
        <p className="demo-note">Demo catalog. Live service connections are not available in this concept.</p>
      </section>
      <section className="how" id="how"><div className="wrap"><div className="eyebrow">02 / KEEP IT SIMPLE</div><div className="how-layout"><h2>Fewer steps.<br/>More time to <span className="serif">create.</span></h2><div className="steps">{[['Choose a service', 'Find the right tool in the integration catalog.'], ['Set permissions', 'Choose which data your workflow needs.'], ['Connect your workflows', 'Bring your everyday tools into a shared workflow.']].map(([title, copy], index) => <div className="step" key={title}><span className="step-number">0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></div></div></section>
      <section className="faq wrap" id="faq"><div><div className="eyebrow">03 / HAVE QUESTIONS?</div><h2>Let’s clear things up.</h2></div><div className="questions">{faqs.map(([question, answer], index) => <div className="question" key={question}><h3><button aria-expanded={opened === index} aria-controls={`answer-${index}`} onClick={() => setOpened(opened === index ? null : index)}>{question}{opened === index ? <Minus size={18}/> : <Plus size={18}/>}</button></h3><p id={`answer-${index}`} hidden={opened !== index}>{answer}</p></div>)}</div></section>
      <section className="closing wrap"><div><div className="eyebrow">GREAT WORK STARTS WITH CONNECTIONS</div><h2>Everything you need. <span className="serif">Together.</span></h2></div><a className="button" href="#integrations">Find your integration <ArrowRight size={18}/></a></section>
    </main>
    <footer className="footer wrap"><a className="wordmark" href="#">linka<span>®</span></a><span>Connecting tools. Making time.</span><span>Landing page concept · 2026</span><nav className="legal-links" aria-label="Legal information"><a href="./documents/terms-of-service.html" target="_blank" rel="noopener noreferrer">Terms of Service</a><a href="./documents/privacy-policy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a></nav></footer>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><dialog open className="modal" ref={node => node?.focus()} tabIndex={-1} aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()} onKeyDown={e => { if (e.key === 'Escape') setSelected(null); if (e.key === 'Tab') { e.preventDefault(); e.currentTarget.querySelector('button')?.focus(); } }}><button className="close" autoFocus onClick={() => setSelected(null)} aria-label="Close"><X size={22}/></button><span className={`monogram ${selected.color}`}>{selected.letter}</span><h2 id="modal-title">{selected.name}</h2><p>{selected.description}</p><div className="modal-note">This is a catalog demo. Authentication and live service connections are not configured.</div></dialog></div>}
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
