import React, { useState, useRef } from "react";

import { useLocation } from "react-router-dom";

const UpdateProduct = () => {
    const location = useLocation();
    const product = location?.state?.product;

    const [title, setTitle] = useState(product?.title || "");
    const [description, setDescription] = useState(product?.description || "");
    const [tags, setTags] = useState(product?.tags || []);
    const [currentTag, setCurrentTag] = useState("");
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleAddTag = () => {
        if (currentTag && !tags.includes(currentTag)) {
            setTags([...tags, currentTag]);
            setCurrentTag("");
        }
    };

    const handleRemoveTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        
        if (images.length + files.length > 10) {
            alert("You can upload up to 10 images only.");
            fileInputRef.current.value = "";
            return;
        }

        const fileURLs = files.map(file => URL.createObjectURL(file));
        setImages([...fileURLs]);
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className="create-product">
            <h2 className="font-700">Update Product</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter product title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        placeholder="Enter product description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ resize: "vertical" }}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Tags</label>
                    <div className="tags-input">
                        <input
                            type="text"
                            placeholder="Enter a tag"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                        />
                        <button type="button" onClick={handleAddTag}>
                            Add
                        </button>
                    </div>
                    <div className="tags-list">
                        {tags.map((tag, index) => (
                            <span key={index} className="tag">
                                {tag}
                                <button type="button" onClick={() => handleRemoveTag(index)}>
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Images</label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                    />
                    <div className="images-preview">
                        {images.map((image, index) => (
                            <div key={index} className="image-preview">
                                <img src={image} alt={`Preview ${index + 1}`} />
                                <button type="button" onClick={() => handleRemoveImage(index)}>
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-fill">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
