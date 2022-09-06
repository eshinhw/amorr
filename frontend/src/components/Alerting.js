import { Store } from 'react-notifications-component';

// https://teodosii.github.io/react-notifications-component/ 
// default typ is info, would change if pass in other values
export default function Alerting(msg, typ = 'info'){
  Store.addNotification({
    title: msg,
    message: "",
    type: typ,
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 1000,
      delay: 0
    }
  });
}