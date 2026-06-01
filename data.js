const talks = [
    {
        id: 'talk1',
        title: 'The Future of AI in Software Development',
        speakers: ['Dr. Alice Smith'],
        category: ['AI', 'Software Engineering'],
        duration: 60, // minutes
        description: 'An in-depth look at how artificial intelligence is transforming the software development lifecycle, from code generation to automated testing.'
    },
    {
        id: 'talk2',
        title: 'Serverless Architectures: Beyond Functions',
        speakers: ['Bob Johnson', 'Carol White'],
        category: ['Cloud', 'Serverless', 'Architecture'],
        duration: 60,
        description: 'Exploring advanced patterns and best practices for building robust and scalable applications using serverless technologies, moving beyond simple functions as a service.'
    },
    {
        id: 'talk3',
        title: 'Demystifying WebAssembly: A Practical Guide',
        speakers: ['David Green'],
        category: ['Web Development', 'Performance'],
        duration: 60,
        description: 'A practical introduction to WebAssembly, demonstrating its capabilities for high-performance web applications and use cases beyond the browser.'
    },
    {
        id: 'talk4',
        title: 'Securing Your APIs: Modern Authentication Flows',
        speakers: ['Eve Black'],
        category: ['Security', 'API'],
        duration: 60,
        description: 'Understanding and implementing modern authentication and authorization flows to protect your APIs from common vulnerabilities.'
    },
    {
        id: 'talk5',
        title: 'Frontend Frameworks in 2026: A Comparative Analysis',
        speakers: ['Frank Brown', 'Grace Lee'],
        category: ['Frontend', 'Web Development'],
        duration: 60,
        description: 'A critical review of the leading frontend frameworks in 2026, comparing their features, performance, and community support.'
    },
    {
        id: 'talk6',
        title: 'Data Streaming with Apache Kafka: Best Practices',
        speakers: ['Henry Wilson'],
        category: ['Data', 'Big Data'],
        duration: 60,
        description: 'Learn how to design and implement efficient data streaming pipelines using Apache Kafka, covering topics from topic design to consumer groups.'
    }
];

const eventStartTime = new Date();
eventStartTime.setHours(10, 0, 0, 0); // Set to 10:00:00 AM today

const schedule = [];
let currentTime = new Date(eventStartTime);

// Helper to format time
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

talks.forEach((talk, index) => {
    const talkStartTime = new Date(currentTime);
    const talkEndTime = new Date(currentTime.getTime() + talk.duration * 60 * 1000);

    schedule.push({
        type: 'talk',
        id: talk.id,
        title: talk.title,
        startTime: formatTime(talkStartTime),
        endTime: formatTime(talkEndTime),
        ...talk
    });

    currentTime = new Date(talkEndTime.getTime());

    // Add transition after each talk, except the last one and before lunch
    if (index < talks.length - 1) {
        if (index === 2) { // After Talk 3, before Talk 4, there is lunch
            const lunchStartTime = new Date(currentTime);
            const lunchEndTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // 1 hour lunch

            schedule.push({
                type: 'break',
                title: 'Lunch Break',
                startTime: formatTime(lunchStartTime),
                endTime: formatTime(lunchEndTime),
                duration: 60
            });
            currentTime = new Date(lunchEndTime);
        } else {
            const transitionStartTime = new Date(currentTime);
            const transitionEndTime = new Date(currentTime.getTime() + 10 * 60 * 1000); // 10 min transition

            schedule.push({
                type: 'transition',
                title: 'Transition',
                startTime: formatTime(transitionStartTime),
                endTime: formatTime(transitionEndTime),
                duration: 10
            });
            currentTime = new Date(transitionEndTime);
        }
    }
});

// For external use
module.exports = { schedule };
