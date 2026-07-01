import './WhatsAppButton.scss';

// Número tomado del README del proyecto (formato internacional, sin signos ni espacios).
const NUMERO_WHATSAPP = '5493416930658';
const MENSAJE_DEFAULT = 'Hola! Quería consultar sobre Finca la Dionisia.';

function WhatsAppButton() {
    const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(MENSAJE_DEFAULT)}`;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
            aria-label="Contactar por WhatsApp"
        >
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C11 9.2 10.6 8 10.5 7.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 3 4.7 4.1.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"/>
                <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4C8.6 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 14.9 3.6 13.5 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.4-8.4 8.4z"/>
            </svg>
        </a>
    );
}

export default WhatsAppButton;
