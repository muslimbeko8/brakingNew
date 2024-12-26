import React, { useEffect, useState } from "react";
import { useCreateArticleMutation } from "../service/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { CloudUpload, Send } from "@mui/icons-material";
import styled from "styled-components";
import { LoadingButton } from "@mui/lab";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const CreateArticle = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [createArticle] = useCreateArticleMutation();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const formSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        formData.append("author", user.username); // Ensure author field is included

        setLoading(true);
        try {
            const res = await createArticle({ body: formData }).unwrap();
            console.log(res);
            setError(false);
            navigate(`/articles/${res.id}`); // Redirect to created article
        } catch (error) {
            setError(true);
            if (error.status === 400) {
                console.log("Validation errors:", error.data);
            } else if (error.status === 401) {
                console.log("Unauthorized: Please log in.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-100px)] justify-center flex items-center">
            <form
                onSubmit={formSubmit}
                className="w-[400px] shadow px-5 py-10 rounded"
            >
                <h3 className="font-bold text-3xl text-center mb-5">
                    Create an article
                </h3>
                <TextField
                    label="Title"
                    variant="outlined"
                    name="title"
                    className="w-full"
                    required
                />
                <Button
                    component="label"
                    className="w-full"
                    sx={{ my: 1 }}
                    variant="contained"
                    startIcon={<CloudUpload />}
                >
                    Upload files
                    <VisuallyHiddenInput type="file" name="image" />
                </Button>
                <TextField
                    label="Content"
                    variant="outlined"
                    name="content"
                    className="w-full"
                    required
                />

                {error && (
                    <p className="text-sm text-red-500 text-center mb-5 font-semibold">
                        Something went wrong. Please check your input.
                    </p>
                )}
                <LoadingButton
                    endIcon={<Send />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    type="submit"
                >
                    Create
                </LoadingButton>
            </form>
        </div>
    );
};

export default CreateArticle;