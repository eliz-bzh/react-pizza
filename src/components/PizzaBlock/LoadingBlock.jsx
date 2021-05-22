import React from "react";
import ContentLoader from "react-content-loader";
//https://skeletonreact.com/

const MyLoader = () => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <circle cx="132" cy="142" r="115" />
        <rect x="0" y="278" rx="3" ry="3" width="280" height="24" />
        <rect x="0" y="320" rx="6" ry="6" width="280" height="84" />
        <rect x="0" y="419" rx="3" ry="3" width="90" height="27" />
        <rect x="126" y="410" rx="20" ry="20" width="152" height="44" />
    </ContentLoader>
)

export default MyLoader;

