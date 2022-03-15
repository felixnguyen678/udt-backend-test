const neededContainer = 10;
const listings = [
    {
        name:  "Container renter A ",
        container: 5,
        totalCost: 5,
    },
    {
        name:  "Container renter B ",
        container: 2,
        totalCost: 10,
    },
    {
        name:  "Container renter C ",
        container: 2,
        totalCost: 3,
    },
];
function rentContainer(neededContainer, listings) {
    let remainingAmount = neededContainer;
    let rentResult = {
        isEnough: true,
        contracts: [],
        totalCost: 0
    };
    const sortedListings =  listings.sort((firstListing, secondListing) => (firstListing.totalCost > secondListing.totalCost) ? 1 : -1);
    for(let i = 0; i < sortedListings.length; i++ ){
        const listing = sortedListings[i];
        rentResult.totalCost += listing.totalCost
        if(listing.container > remainingAmount) {
            rentResult.contracts.push({
                name: listing.name,
                container: remainingAmount,
                price: listing.totalCost
            })
            break;
        } else {
            rentResult.contracts.push({
                name: listing.name,
                container: listing.container,
                price: listing.totalCost
            })
            if(i === sortedListings.length -1 ){
                rentResult.isEnough = false;
            } else {
                remainingAmount -= listing.container
                if(remainingAmount === 0 ) {
                    break;
                }
            }
        }

    }
    printOutputFromRentResult(rentResult);
}

function printOutputFromRentResult(rentResult){
    rentResult.contracts.map(contract => {
        console.log(`[Contact with] ${contract.name} ${contract.container} container, price: ${contract.price}`)
    })
    if(!rentResult.isEnough) {
        console.log('Not enough containers')
    }
    console.log(`[Summary] total cost ${rentResult.totalCost}`)
}

rentContainer(neededContainer, listings)
