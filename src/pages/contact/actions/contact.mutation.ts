import {useMutation} from 'react-query';
import {ISendContact} from '../contact';
import {sendContact} from './contact.service';

export const useSendContact = () => {
    return useMutation({
        mutationFn: (post: ISendContact) => {
            return sendContact(post);
        },
    });
};
