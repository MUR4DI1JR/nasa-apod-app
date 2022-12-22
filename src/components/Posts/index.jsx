import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
import dayjs from "dayjs";
import {Chat, Eye, Pen, Trash} from "phosphor-react";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../redux/slices/auth";
import ReactMarkdown from "react-markdown";
import {fetchRemovePosts} from "../../redux/slices/posts";
import {shortText} from "../../utils/helper";

const PostItems = ({_id, title, user, text, tags, imageURL, createdAt, viewCount}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(selectUser);

    const onClickRemove = () => {
        dispatch(fetchRemovePosts(_id))
    }

    return (
        <>
            <div key={_id} className="w-full flex flex-col shadow my-4">
                <div>
                    {
                        imageURL ?
                            <img className="w-full h-[450px] object-cover" src={`${process.env.API_URL}${imageURL}`}/>
                            :
                            null
                    }
                </div>
                <div className="bg-white flex flex-col justify-start p-6 relative">
                    {
                        userData?._id === user._id ?
                            <div className="absolute top-[0px] right-[15px] flex text-white">
                                <Pen onClick={() => navigate(`${ROUTES.CREATE_POST}/${_id}/edit`)} className="bg-gray-600 mr-[10px] rounded-b" size={25}/>
                                <Trash onClick={onClickRemove} className="rounded-b bg-red-600" size={25}/>
                            </div>
                            :
                            null
                    }
                    <div className="flex">
                        {
                            tags.map((item, i) => <a href="#"
                                                     key={i}
                                                     className="text-blue-700 text-sm font-bold uppercase pb-4 mr-[5px]">#{item}</a>)
                        }
                    </div>
                    <Link to={`${ROUTES.POSTS}/${_id}`}
                          className="text-3xl font-bold hover:text-gray-700 pb-4">{title}</Link>
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
                    <div className="pb-6"><ReactMarkdown children={shortText(text)} /></div>
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