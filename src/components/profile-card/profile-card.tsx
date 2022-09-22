import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import image from "../../assets/profile.png";
import { baseUrl } from "../../axios";
import Skill from "../skill/skill";
import styles from "./profile-card.module.css";
<<<<<<< HEAD
import IProfileCard from "../../interfaces/IProfileCard";

const ProfileCard = ({
  id,
  name,
  city,
  description,
  skills,
  setNeedUpdateAfterCreation,
}: IProfileCard) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [wilderNameToDelete, setWilderNameToDelete] = useState("");

  const handleSelectDelete = () => {
    setWilderNameToDelete(name);
    setDeleteConfirmOpen(true);
  };

  const deleteConfirmation = async () => {
    await axios.delete(`${baseUrl}/wilders/${id}`);
    setDeleteConfirmOpen(false);
    setNeedUpdateAfterCreation(true);
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setWilderNameToDelete("");
  };

  return (
    <>
      {deleteConfirmOpen && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>
              Are you sure you want to delete the wilder {wilderNameToDelete} ?
            </h2>
            <div className={styles.actionButtonsWrapper}>
              <button className="button cancelBtn" onClick={cancelDelete}>
                Cancel
              </button>
              <button
                className={`button ${styles.deleteBtn}`}
                onClick={deleteConfirmation}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <article className={styles.card}>
        <img src={image} alt={name + " Profile"} />
        <h3>{name || "Wilder"}</h3>
        <p className={styles.city}>{city || "No city specified."}</p>
        <p>{description || "No description yet."}</p>
        <h4>Wild Skills</h4>
        <ul className={styles.skills}>
          {skills && skills.length > 0
            ? skills.map((skill, index) => (
                <Skill key={index} title={skill.title} grades={skill.grades} />
              ))
            : "No skills yet"}
        </ul>
        <button
          className={`${styles.deleteWilderBtn} button`}
          onClick={handleSelectDelete}
        >
          Delete
        </button>
      </article>
    </>
  );
};

ProfileCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  city: PropTypes.string,
  wilderSkills: PropTypes.array,
  setNeedUpdateAfterCreation: PropTypes.func,
=======
import IProfileCard from "../../interfaces/wilder/IProfileCard";

const ProfileCard = ({
    id,
    name,
    city,
    description,
    wilderObj,
    skills,
    setNeedUpdateAfterCreation,
    setWilderToEdit,
}: IProfileCard) => {
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [wilderNameToDelete, setWilderNameToDelete] = useState("");

    const handleSelectDelete = () => {
        setWilderNameToDelete(name);
        setDeleteConfirmOpen(true);
    };

    const deleteConfirmation = async () => {
        await axios.delete(`${baseUrl}/wilders/${id}`);
        setDeleteConfirmOpen(false);
        setNeedUpdateAfterCreation(true);
    };

    const cancelDelete = () => {
        setDeleteConfirmOpen(false);
        setWilderNameToDelete("");
    };

    const handleSelectEdit = () => {
        console.log(wilderObj);
        setWilderToEdit(wilderObj);
    };

    return (
        <>
            {deleteConfirmOpen && (
                <div className={styles.overlay}>
                    <div className={styles.popup}>
                        <h2>
                            Are you sure you want to delete the wilder{" "}
                            {wilderNameToDelete} ?
                        </h2>
                        <div className={styles.actionButtonsWrapper}>
                            <button
                                className="button cancelBtn"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </button>
                            <button
                                className={`button ${styles.deleteBtn}`}
                                onClick={deleteConfirmation}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <article className={styles.card}>
                <img src={image} alt={name + " Profile"} />
                <h3>{name || "Wilder"}</h3>
                <p className={styles.city}>{city || "No city specified."}</p>
                <p>{description || "No description yet."}</p>
                <h4>Wild Skills</h4>
                <ul className={styles.skills}>
                    {skills && skills.length > 0
                        ? skills.map((skill, index) => (
                              <Skill
                                  key={index}
                                  id={skill.id}
                                  name={skill.name}
                                  grades={skill.grades}
                              />
                          ))
                        : "No skills yet"}
                </ul>
                <button className="button" onClick={handleSelectEdit}>
                    Edit
                </button>
                <button
                    className={`${styles.deleteWilderBtn} button`}
                    onClick={handleSelectDelete}
                >
                    Delete
                </button>
            </article>
        </>
    );
};

ProfileCard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string,
    wilderSkills: PropTypes.array,
    setNeedUpdateAfterCreation: PropTypes.func,
>>>>>>> 52e607e35d47fa7744fcaacf12c68f346e859479
};

export default ProfileCard;
