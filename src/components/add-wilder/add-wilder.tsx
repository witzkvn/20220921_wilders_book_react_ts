import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../axios";
import { useForm, SubmitHandler } from "react-hook-form";
import PropTypes from "prop-types";
import styles from "./add-wilder.module.css";
import AddSkillInput from "./add-skill-input";
import IAddWilderForm from "../../interfaces/form/IAddWilderForm";
import ISkill from "../../interfaces/skills/ISkill";
import ISkillWithGrade from "../../interfaces/skills/ISkillWithGrade";
import ISkillAvailable from "../../interfaces/skills/ISkillAvailable";

type WilderInputs = {
  name: string;
  description: string;
  city: string;
};

const AddWilder = ({
  wilderToEdit,
  setWilderToEdit,
  setNeedUpdateAfterCreation,
}: IAddWilderForm) => {
  const [skillsAvailable, setSkillsAvailable] = useState<ISkillAvailable[]>([]);
  const [postError, setPostError] = useState(false);
  const [gradesAdded, setGradesAdded] = useState<ISkillWithGrade[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<WilderInputs>();

  const onSubmit: SubmitHandler<WilderInputs> = async (data) => {
    if (!data.name || !data.description) return;
    if (wilderToEdit !== null) {
      // edit call
      try {
        const patchBody = {
          name: data.name,
          description: data.description,
          city: data.city,
          grades: gradesAdded,
        };
        console.log("To PATCH: ", patchBody);
        await axios.patch(`${baseUrl}/wilders/${wilderToEdit.id}`, patchBody);

        setNeedUpdateAfterCreation(true);
        setGradesAdded([]);
        setPostError(false);
        reset();
      } catch (error) {
        setPostError(true);
      }
    } else {
      // create call
      try {
        await axios.post(`${baseUrl}/wilders`, {
          name: data.name,
          description: data.description,
          city: data.city,
          grades: gradesAdded,
        });

        setNeedUpdateAfterCreation(true);
        setGradesAdded([]);
        reset();
        setPostError(false);
      } catch (error) {
        setPostError(true);
      }
    }
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

  useEffect(() => {
    if (wilderToEdit === null) {
      reset();
    } else {
      window.scrollTo(0, 0);
      setValue("name", wilderToEdit.name);
      setValue("description", wilderToEdit.description);
      wilderToEdit.city
        ? setValue("city", wilderToEdit.city)
        : setValue("city", "");
      setGradesAdded(wilderToEdit.grades);
    }
  }, [reset, setValue, wilderToEdit]);

  useEffect(() => {
    console.log(gradesAdded);
  }, [gradesAdded]);

  const handleAddSkill = (skillId: number, grades: number) => {
    const isSkillAlreadySet = gradesAdded.some(
      (skill) => skill.skillId === skillId
    );
    if (isSkillAlreadySet) return;

    const skillToAdd = skillsAvailable.find(
      (skill: ISkill) => skill.id === skillId
    );

    if (skillToAdd) {
      const skillName: string = skillToAdd.name;
      setGradesAdded((prev) => {
        return [
          ...prev,
          {
            skillId: skillId,
            name: skillName,
            grades,
          },
        ];
      });
    }
  };

  const handleDeleteSkill = (index: number) => {
    setGradesAdded((prev) => {
      const updatedState = [...prev];
      updatedState.splice(index, 1);
      return updatedState;
    });
  };

  const handleCancelEdit = () => {
    reset();
    setWilderToEdit(null);
  };

  return (
    <div className="formWrapper">
      <h3>{wilderToEdit === null ? "Create New Wilder" : "Edit the Wilder"}</h3>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="label" htmlFor="name">
          Name:
        </label>
        <input
          className="input"
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        <br />
        <label className="label" htmlFor="city">
          City:
        </label>
        <input
          className="input"
          type="text"
          id="city"
          {...register("city", { required: false })}
        />
        <br />
        <label className="label" htmlFor="description">
          Description:
        </label>
        <textarea
          className="input textarea"
          id="description"
          {...register("description", { required: true })}
        ></textarea>
        <br />
        <div>
          {gradesAdded && gradesAdded.length > 0 ? (
            <>
              <h3>Skills added</h3>
              {gradesAdded.map((skill, index) => (
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
        {Object.keys(errors).length !== 0 && (
          <span className="error">
            An error occured. Please watch again all your inputs before sending
            the form.
          </span>
        )}
        {postError && (
          <span className="error">
            An error occured while sending the form. Please try again.
          </span>
        )}
        <br />
        {wilderToEdit !== null ? (
          <div className="button-wrapper-right">
            <button
              className="button cancelBtn"
              type="button"
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </button>
            <button type="submit" className="button">
              Update Wilder
            </button>
          </div>
        ) : (
          <button type="submit" className="button button-right">
            Add Wilder
          </button>
        )}
      </form>
    </div>
  );
};

AddWilder.propTypes = {
  setNeedUpdateAfterCreation: PropTypes.func,
};

export default AddWilder;
