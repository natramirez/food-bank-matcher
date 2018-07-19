import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

// Fix for unwanted text decoration for links
const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export {StyledLink}