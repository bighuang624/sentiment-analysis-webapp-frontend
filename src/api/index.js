import fetch from '../utils/fetch';

export function send(params) {
    return fetch({
        url: '/predict',
        method: 'post',
        params: params
    });
}