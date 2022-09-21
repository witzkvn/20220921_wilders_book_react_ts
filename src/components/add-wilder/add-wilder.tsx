import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../axios";
import PropTypes from "prop-types";
import styles from "./add-wilder.module.css";
import AddSkillInput from "./add-skill-input";
import IAddWilderForm from "../../interfaces/form/IAddWilderForm";
import ISkill from "../../interfaces/skills/ISkill";
import ISkillWithGrade from "../../interfaces/skills/ISkillWithGrade";
import ISkillAvailable from "../../interfaces/skills/ISkillAvailable";

const AddWilder = ({ setNeedUpdateAfterCreation }: IAddWilderForm) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [skillsAvailable, setSkillsAvailable] = useState<ISkillAvailable[]>([]);
  const [skillsAdded, setSkillAdded] = useState<ISkillWithGrade[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;
    await axios.post(`${baseUrl}/wilders`, {
      name,
      description,
      city,
      skills: skillsAdded,
    });

    setName("");
    setDescription("");
    setCity("");
    setSkillAdded([]);
    setNeedUpdateAfterCreation(true);
  };

  useEffect(() => {
    const getSkillsAvailable = async () => {
      const res = await axios.get(`${baseUrl}/skills`);

      if (res.data.skills) {
        const skillsState = res.data.skills.map((skill: ISkill) => {
          return {
            id: skill.id,
            name: skill.name,
            selected: false,
            grades: 0,
          };
        });
        setSkillsAvailable(skillsState);
      }
    };
    getSkillsAvailable();
  }, []);

  const handleAddSkill = (skillId: number, grades: number) => {
    const isSkillAlreadySet = skillsAdded.some((skill) => skill.id === skillId);

    if (isSkillAlreadySet) return;

    const skillToAdd = skillsAvailable.find(
      (skill: ISkill) => skill.id === skillId
    );

    if (skillToAdd) {
      const skillName: string = skillToAdd.name;
      setSkillAdded((prev) => {
        return [
          ...prev,
          {
            id: skillId,
            name: skillName,
            grades,
          },
        ];
      });
    }
  };

  const handleDeleteSkill = (index: number) => {
    setSkillAdded((prev) => {
      const updatedState = [...prev];
      updatedState.splice(index, 1);
      return updatedState;
    });
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="name">
          Name:
        </label>
        <input
          className={styles.input}
          type="text"
          name="name"
          id="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label className={styles.label} htmlFor="city">
          City:
        </label>
        <input
          className={styles.input}
          type="text"
          name="city"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <label className={styles.label} htmlFor="description">
          Description:
        </label>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <br />
        <div>
          {skillsAdded && skillsAdded.length > 0 ? (
            <>
              <h3>Skills added</h3>
              {skillsAdded.map((skill, index) => (
                <div key={index} className={styles.skillInput}>
                  <p>
                    {skill.name} {skill.grades}/10
                  </p>
                  <button
                    className="button whiteBtn"
                    type="button"
                    onClick={() => handleDeleteSkill(index)}
                  >
                    Delete Skill
                  </button>
                </div>
              ))}
            </>
          ) : (
            "No skill added yet"
          )}
          <AddSkillInput
            skillsAvailable={skillsAvailable}
            handleAddSkill={handleAddSkill}
          />
        </div>
        <br />
        <button type="submit" className="button">
          Add Wilder
        </button>
      </form>
    </div>
  );
};

AddWilder.propTypes = {
  setNeedUpdateAfterCreation: PropTypes.func,
};

export default AddWilder;
