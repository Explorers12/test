import styled from 'styled-components';

const AsideContainer = styled.ul`
    font: inherit;
    font-size: 80%;
    vertical-align: baseline;
    width: 80%;
    padding:30px 0 0 15px;

.list-head {
    background-color: hsl(47,83%,91%);
    padding: 10px;
    border:solid 1px hsl(47,75%,85%);
    font-weight: bold;
}

.list-body {
    background-color:hsl(47,87%,94%);
    border-left:solid 1px hsl(47,75%,85%);
    border-right:solid 1px hsl(47,75%,85%);
    border-bottom:solid 1px hsl(47,75%,85%);
    padding: 5px;
    list-style-type: disc;
    list-style-position: inside;
}

`;

function Aside() {
    return (
        <AsideContainer>
            <li className='list-head'>The Overflow Blog</li>
            <li className='list-body'>Speeding up the I/O-heavy app: Q&A with Malte Ubl of Vercel</li>
            <li className='list-body'>Understanding SRE (Ep. 597)</li>
            <li className='list-head'>Featured on Meta</li>
            <li className='list-body'>Moderation strike: Results of negotiations</li>
            <li className='list-body'>Our Design Vision for Stack Overflow and the Stack Exchange network</li>
        </AsideContainer>
    )
}

export default Aside;