import { useState } from 'react';
import './App.scss';
import _jobs from './data/jobs.json';

_jobs.forEach((job) => {
	job.status = 'accepted';
});

const statuses = ['send', 'wait', 'interview', 'declined', 'accepted'];

function App() {
	const [displayKind, setDisplayKind] = useState('full');
	const [jobs, setJobs] = useState(_jobs);

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
				<div className="jobs">
					{jobs.map((job, index) => {
						return (
							<div key={index}>
								<div
									key={index}
									className={`job ${job.status}`}
								>
									<div className="header">
										<div className="position">
											<a href={job.url}>{job.position}</a>
										</div>
										<button
											onClick={() =>
												handleStatusChange(job)
											}
											className="status"
										>
											{job.status}
										</button>
									</div>
									<div className="skills">{job.skills}</div>
									{job.status !== 'declined' && (
										<div className="bulkText">
											{job.bulkText}
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<ul className="jobList">
					{jobs.map((job, index) => {
						return (
							<div key={index}>
								<li key={index}>
									<a href={job.url}>{job.position}</a>
								</li>
							</div>
						);
					})}
				</ul>
			)}
		</div>
	);
}

export default App;
