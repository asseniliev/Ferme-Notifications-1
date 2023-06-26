export default function nextDeliveryDate() {
    const today = new Date();
    const currentDay = today.getDay();
    const daysUntilThursday = 5 - currentDay + 7;
    let nextThursday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + daysUntilThursday
    );
    const day = nextThursday.getDate().toString().padStart(2, "0");
    const month = (nextThursday.getMonth() + 1).toString().padStart(2, "0"); // January is 0!
    const year = nextThursday.getFullYear().toString().substr(-4);

    const nextDeliveryDate = `${day}/${month}/${year}`;

    //console.log(nextDeliveryDate)

    return nextDeliveryDate
}