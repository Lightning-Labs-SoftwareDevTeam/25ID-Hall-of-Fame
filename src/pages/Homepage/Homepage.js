import React, { useState } from 'react';


function Homepage() {
    const [recipients, setRecipients] = useState(null);

    return (
        <div>
            <header>
                Welcome to 25ID Hall of Fame!
            </header>
        </div>
    )
}

export default Homepage;