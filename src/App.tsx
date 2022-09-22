import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { baseUrl } from "./axios";
import AddSkill from "./components/add-skill/add-skill";
import AddWilder from "./components/add-wilder/add-wilder";
import Footer from "./components/footer/footer";
import ProfileCard from "./components/profile-card/profile-card";
import IProfileCard from "./interfaces/wilder/IProfileCard";
import IWilderFromDb from "./interfaces/wilder/IWilderFromDb";

function App() {
  const [wilders, setWilders] = useState<IProfileCard[]>([]);
  const [needUpdateAfterCreation, setNeedUpdateAfterCreation] = useState(false);
  const [wilderToEdit, setWilderToEdit] = useState<IWilderFromDb | null>(null);

  const fetchWilders = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/wilders`);
      if (res && res.data && res.data.wilders) {
        setWilders(res.data.wilders);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchWilders();
  }, [fetchWilders]);

  useEffect(() => {
    if (needUpdateAfterCreation) {
      fetchWilders();
    }
    setNeedUpdateAfterCreation(false);
  }, [fetchWilders, needUpdateAfterCreation]);

  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container">
        <h2>Add a Wilder & A Skill</h2>
        <section className="section section-row">
          <AddWilder
            setWilderToEdit={setWilderToEdit}
            wilderToEdit={wilderToEdit}
            setNeedUpdateAfterCreation={setNeedUpdateAfterCreation}
          />
          <AddSkill setNeedUpdateAfterCreation={setNeedUpdateAfterCreation} />
        </section>
        <h2>Wilders</h2>
        <section className="card-row section">
          {wilders
            ? wilders.map((wilder, index) => (
                <ProfileCard
                  key={wilder?.id || index}
                  id={wilder.id}
                  name={wilder.name}
                  city={wilder.city}
                  description={wilder.description}
                  grades={wilder.grades}
                  wilderObj={wilder}
                  setNeedUpdateAfterCreation={setNeedUpdateAfterCreation}
                  setWilderToEdit={setWilderToEdit}
                />
              ))
            : "Please add wilders"}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
