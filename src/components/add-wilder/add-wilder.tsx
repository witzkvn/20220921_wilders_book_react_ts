import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../axios";
<<<<<<< HEAD
=======
import { useForm, SubmitHandler } from "react-hook-form";
>>>>>>> 52e607e35d47fa7744fcaacf12c68f346e859479
import PropTypes from "prop-types";
import styles from "./add-wilder.module.css";
import AddSkillInput from "./add-skill-input";
import IAddWilderForm from "../../interfaces/form/IAddWilderForm";
import ISkill from "../../interfaces/skills/ISkill";
import ISkillWithGrade from "../../interfaces/skills/ISkillWithGrade";
import ISkillAvailable from "../../interfaces/skills/ISkillAvailable";

<<<<<<< HEAD
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
=======
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
    const [skillsAvailable, setSkillsAvailable] = useState<ISkillAvailable[]>(
        []
    );
    const [postError, setPostError] = useState(false);
    const [skillsAdded, setSkillAdded] = useState<ISkillWithGrade[]>([]);
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
                await axios.post(`${baseUrl}/wilders/${wilderToEdit.id}`, {
                    name: data.name,
                    description: data.description,
                    city: data.city,
                    skills: skillsAdded,
                });

                setNeedUpdateAfterCreation(true);
                setSkillAdded([]);
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
                    skills: skillsAdded,
                });

                setNeedUpdateAfterCreation(true);
                setSkillAdded([]);
                reset();
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
            setSkillAdded(wilderToEdit.skills);
        }
    }, [reset, setValue, wilderToEdit]);

    const handleAddSkill = (skillId: number, grades: number) => {
        const isSkillAlreadySet = skillsAdded.some(
            (skill) => skill.id === skillId
        );

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

    const handleCancelEdit = () => {
        reset();
        setWilderToEdit(null);
    };

    return (
        <div className="formWrapper">
            <h3>
                {wilderToEdit === null
                    ? "Create New Wilder"
                    : "Edit the Wilder"}
            </h3>
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
                {Object.keys(errors).length !== 0 && (
                    <span className="error">
                        An error occured. Please watch again all your inputs
                        before sending the form.
                    </span>
                )}
                {postError && (
                    <span className="error">
                        An error occured while sending the form. Please try
                        again.
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
>>>>>>> 52e607e35d47fa7744fcaacf12c68f346e859479
};

export default AddWilder;
