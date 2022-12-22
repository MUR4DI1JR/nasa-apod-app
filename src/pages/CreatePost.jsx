import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import SimpleMDE from 'react-simplemde-editor';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/slices/auth";
import axios from "../axios";
import {ROUTES} from "../constants/routes";

const CreatePost = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const isAuth = useSelector(selectUser);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');
    const inputFileRef = useRef(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleChangeFile = async (e) => {
        try {
            const formData = new FormData();
            const file = e.target.files[0];

            formData.append('image', file);

            const {data} = await axios.post('/uploads', formData);

            setImageUrl(data.url);

        } catch (e) {
            console.log(e);
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    const onChange = useCallback((value) => {
        setText(value);
    }, []);

    const onSubmit = async () => {
        try{
            const fields = {
                title,
                imageURL: imageUrl,
                tags: tags.split(' '),
                text
            }

            const {data} = id ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields);
            const idPost = id ? id : data._id;
            navigate(`${ROUTES.POSTS}/${idPost}`);

        }catch (e) {
            console.log(e);
        }

    };

    useEffect(() => {
        if (id){
            axios.get(`/posts/${id}`).then(res => {
                setTitle(res.data.title);
                setText(res.data.text);
                setImageUrl(res.data.imageURL);
                setTags(res.data.tags.join(','));
            })
        }
    },[]);

    const options = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className="container bg-gray-100 py-[30px]">
            <div className="w-[80%] mx-auto rounded-[5px] p-[10px] bg-white">
                <button
                    onClick={() => inputFileRef.current.click()}
                    className="bg-gray-300 my-[5px] hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                    </svg>
                    <span>Image upload</span>
                </button>
                <input
                    ref={inputFileRef}
                    onChange={handleChangeFile}
                    type="file"
                    hidden
                />
                {imageUrl && (
                    <>
                        <button
                            className="bg-red-600 ml-[10px] hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                            onClick={onClickRemoveImage}>
                            Удалить
                        </button>
                        <img
                            className="w-full rounded"
                            src={`http://localhost:5000${imageUrl}`}
                            alt="Uploaded"
                        />
                    </>
                )}
                <div>
                    <input
                        className="w-full h-[55px] font-bold outline-none text-[35px]"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={"Title post"}
                    />
                    <input
                        className="w-full outline-none text-[18px] h-[24px] my-[20px] border-b-[2px]"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder={"Tags"}
                    />
                    <SimpleMDE value={text} onChange={onChange} options={options}/>
                </div>
                <div className="my-[10px] flex w-full justify-end">
                    <button
                        onClick={onSubmit}
                        className="bg-gray-300 mr-[10px] hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                        <span>
                            {
                                id ?
                                    "Update post"
                                :
                                    "Add post"
                            }
                            </span>
                    </button>
                    <button
                        className="bg-red-600  hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                        <span>Cancel</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;