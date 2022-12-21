import React from 'react';
import {Link} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
import dayjs from "dayjs";
import {Chat, Eye} from "phosphor-react";

const PostItems = ({_id, title, user, text, tags, imageURL, createdAt, viewCount}) => {
    return (
        <>
            <div key={_id} className="flex flex-col shadow my-4">
                <div>
                    <img src={imageURL}/>
                </div>
                <div className="bg-white flex flex-col justify-start p-6">
                    <div className="flex">
                        {
                            tags.map((item, i) => <a href="#"
                                                     key={i}
                                                     className="text-blue-700 text-sm font-bold uppercase pb-4 mr-[5px]">#{item}</a>)
                        }
                    </div>
                    <Link to={`${ROUTES.POSTS}/${_id}`} className="text-3xl font-bold hover:text-gray-700 pb-4">{title}</Link>
                    <div className="text-sm pb-3 flex items-center">
                        <img
                            className="inline-block h-10 w-10 rounded-full ring-2 ring-white mr-[5px]"
                            src={user.avatarURL}
                            alt="ava"
                        />
                        By <p className="font-semibold hover:text-gray-800">{user.fullName}</p>,
                        Published on {dayjs(createdAt).format(
                        'MM.DD.YYYY',
                    )}
                    </div>
                    <p className="pb-6">{text}</p>
                    <div className="flex items-center mt-[10px]">
                        <div className="flex items-center">
                            <Eye size={20} className="mr-[5px]"/>
                            {viewCount}
                        </div>
                        <div className="flex items-center ml-[15px]">
                            <Chat size={20} className="mr-[5px]"/> 0
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostItems;