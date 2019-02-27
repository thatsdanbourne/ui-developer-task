    SELECT 
    jobs.id as 'id', 
    job_title as 'title', 
    companies.img_mini_logo_new as 'logo', 
    deadline, jobs.salary as 'salary', 
    duration_one as 'duration', 
    jobs.regions as 'location', 
    companies.name as 'company_name', 
    companies.id as 'company_id'
    FROM jobs
    LEFT JOIN companies on companies.id = jobs.comp_id
    LIMIT 50, 100
