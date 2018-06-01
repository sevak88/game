import { notification } from 'antd';



export function notificate(type, notifications) {
   // const notifications = response.body.notifications;

    Object.keys(notifications).map((objectKey, index) => {
        const messages = notifications[objectKey];
        messages.forEach((message) => {

            notification[type]({
                message: objectKey,
                description: message,
            })
        });
    });
}
