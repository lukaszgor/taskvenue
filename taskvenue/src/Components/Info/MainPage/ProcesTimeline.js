import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useTranslation } from 'react-i18next';

const ProcessTimeline = () => {
    const { t, i18n } = useTranslation();

    const elements = [
        { title: t('Location Registration'), description: t('Record the places where your employees work. This will allow you to track the progress of tasks and make settlements easier. Employees will also know exactly where to go.'), icon: <LocationOnIcon/>},
        { title: t('Task Planning'), description: t("Consider your team's availability and plan tasks accordingly. This will ensure peace of mind for you and your coworkers. Use the TaskVenue calendar to see tasks and scheduled staff absences."), icon: <EventNoteIcon/> },
        { title: t('Task Execution'), description: t('Employees will receive notifications about tasks directly on their mobile devices. Confirming the completion of tasks, along with the location and time taken, will help you stay updated with the progress.'), icon:<WorkOutlineIcon/> },
        { title: t('Settlement report'), description: t('The system allows for secure data management that is accessible at all times. You can easily create summaries and reports, for both employees and contractors.'), icon: <AssessmentIcon/>  },
    ];

    return (
        <VerticalTimeline>
            {elements.map((element, index) => (
                <VerticalTimelineElement
                    key={index}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={element.icon}
                    
                >
                    <h2 className="vertical-timeline-element-title">{element.title}</h2>
                    <p>{element.description}</p>
                </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
    );
};

export default ProcessTimeline;
