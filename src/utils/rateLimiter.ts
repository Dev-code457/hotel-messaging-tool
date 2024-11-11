// utils/rateLimiter.ts

import { AppError } from "./errorHandler";

const rateLimit = (limit: number, timeWindowMs: number) => {
    const requests: { [key: string]: number[] } = {};

    return (req: Request) => {
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')

        if (!ip) {
            throw new Error('IP address is missing');
        }

        const currentTime = Date.now();
        const requestTimes = requests[ip] || [];

        // Remove old requests from the array
        const recentRequests = requestTimes.filter(
            (timestamp) => currentTime - timestamp < timeWindowMs
        );

        requests[ip] = recentRequests;

        // Check if the user has exceeded the limit
        if (recentRequests.length >= limit) {
            throw new AppError(429, "Too many requests, Please try again later")
        }

        // Add the current request timestamp
        requests[ip].push(currentTime);
    };
};

export default rateLimit;
