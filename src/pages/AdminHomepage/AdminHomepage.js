import React, { useState } from 'react';


function AdminHomepage() {
    const [members, setMembers] = useState(null);

    return (
        <div>
            <header>
                Welcome to the admin homepage!
            </header>
        </div>
    )
}

export default AdminHomepage;