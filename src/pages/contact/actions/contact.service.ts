import {profile} from 'core/configs/content.config';
import {ISendContact} from '../contact';

// Backend hələ yoxdur: mesaj istifadəçinin email proqramında hazır şəkildə açılır (mailto).
// API hazır olanda burada axiosPublic ilə POST sorğusu olacaq.
export const sendContact = ({form, subject}: ISendContact): Promise<void> => {
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    const url = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return Promise.resolve()
        .then(() => {
            window.location.href = url;
        });
};
