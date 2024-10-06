const parseExtractedText = (text) => {
    const result = {
        name: '',
        jobTitle: '',
        company: '',
        email: '',
        phone: '',
        address: ''
    };

    // Regular Expressions
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /^[^\w\s]*\+?[1-9]\d{0,14}([ -]?\(?\d{1,4}\)?[ -]?\d{1,4})*$/; // Updated for phone numbers
    const nameRegex = /([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)+/;
    const jobTitleRegex = /(?:CEO|CTO|Manager|Engineer|Developer|Designer|Sales|Marketing|Consultant|Analyst|Director|Lead|Specialist|Representative|Executive|Founder|Owner|Partner|President|Vice President|Coordinator|Supervisor)/i;
    const companyRegex = /(?<=\n|^)([A-Z][a-zA-Z\s&.-]+)(?=\s*\n|\s*\b)/;
    const addressRegex = /^\d{1,5}\s(?:[A-Za-z0-9\s.-]+(?:\s(Apt|Apartment|Suite|Ste|Unit|Bldg|Building)?\s?\d{1,5})?)(?:,\s?[A-Za-z\s]+)+,\s?[A-Z]{2}\s?\d{5}$/; // Updated for wider address matching

    // Split text into lines for better processing
    const lines = text.split('\n');

    lines.forEach((line) => {
        line = line.trim();

        // Extract email
        const emailMatch = line.match(emailRegex);
        if (emailMatch) {
            result.email = emailMatch[0];
        }

        // Extract phone number
        const phoneMatch = line.match(phoneRegex);
        if (phoneMatch && phoneMatch[1]) {
            result.phone = phoneMatch[0].replace(/[\s()-]/g, '');

        }

        // Extract name
        const nameMatch = line.match(nameRegex);
        if (nameMatch && !result.name) {
            result.name = nameMatch[0];
        }

        // Extract job title
        const jobTitleMatch = line.match(jobTitleRegex);
        if (jobTitleMatch && !result.jobTitle) {
            result.jobTitle = jobTitleMatch[0];
        }

        // Extract company name
        const companyMatch = line.match(companyRegex);
        if (companyMatch && !result.company) {
            result.company = companyMatch[0];
        }

        // Extract address
        const addressMatch = line.match(addressRegex);
        if (addressMatch && !result.address) {
            result.address = addressMatch[0];
        }
    });

    return result;
};

export default parseExtractedText;