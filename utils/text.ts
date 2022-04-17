const sanitize = (text: string): string => text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');

export { sanitize }