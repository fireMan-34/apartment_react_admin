import React, { useState } from 'react'
import ContentLayout from '../../components/ContentLayout'

const ShowFloorNumberTextNode = ({ floors }) => {
    return <p>一共有{floors || 0}栋楼</p>;
}

export default function Build() {
    const [floors, setFloors] = useState(null);
    return (
        <ContentLayout Com={<div>
            <ShowFloorNumberTextNode floors={floors} />
        </div>} />
    )
}
