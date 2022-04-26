import { useState, useEffect } from 'react';
import './App.scss';
import _jobs from './data/jobs.json';
import { JobsFull } from './components/JobsFull';
import { JobsList } from './components/JobsList';

_jobs.forEach((job) => {
	job.status = 'accepted';
});

const statuses = ['send', 'wait', 'interview', 'declined', 'accepted'];

function App() {
	const [displayKind, setDisplayKind] = useState('full');
	const [jobs, setJobs] = useState(_jobs);

	const saveToLocalStorage = () => {
		const jobAppState = {
			displayKind,
			jobs,
		};
		localStorage.setItem('jobAppState', JSON.stringify(jobAppState));
	};

	useEffect(() => {
		saveToLocalStorage();
	}, [displayKind, jobs]);

	const handleToggleView = () => {
		const _displayKind = displayKind === 'full' ? 'list' : 'full';
		setDisplayKind(_displayKind);
	};

	const handleStatusChange = (job) => {
		let statusIndex = statuses.indexOf(job.status);
		statusIndex++;
		if (statusIndex > statuses.length - 1) {
			statusIndex = 0;
		}
		job.status = statuses[statusIndex];
		setJobs([...jobs]);
	};

	return (
		<div className="App">
			<h1>Job Application Process</h1>
			<button onClick={handleToggleView}>Toggle View</button>
			{displayKind === 'full' ? (
				<JobsFull jobs={jobs} handleStatusChange={handleStatusChange} />
			) : (
				<JobsList jobs={jobs} />
			)}
		</div>
	);
}

export default App;
