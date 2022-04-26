export const JobsFull = ({ jobs, handleStatusChange }) => {

	const skillDefinitions = [
		{
			"title": "PHP",
			"description": "a server-side language created in the 90s"
		},
		{
			"title": "Go",
			"description": "Google's new low-level language"
		}
	]
	return (
		<div className="jobs">
			{jobs.map((job, index) => {
				return (
					<div key={index} className={`job ${job.status}`}>
						<div className="header">
							<div className="position">
								<a href={job.url}>{job.position}</a>
							</div>
							<button
								onClick={() => handleStatusChange(job)}
								className="status"
							>
								{job.status}
							</button>
						</div>
						<div className="skills">{job.skills}</div>
						{job.status !== 'declined' && (
							<div className="bulkText">{job.bulkText}</div>
						)}
						<ul className="skillDefinitions">
							{skillDefinitions.map((sd, index) => {
								return (
									<li>{sd.title} - {sd.description}</li>
								)
							})}
						</ul>
					</div>
				);
			})}
		</div>
	);
};
