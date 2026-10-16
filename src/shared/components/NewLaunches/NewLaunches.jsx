import {
  useEffect,
  useState,
} from "react";

import { BsArrowRight } from "react-icons/bs";

import NewLaunchCard from "./NewLaunchCard";

import {
  getNewLaunches,
} from "../../../entities/project/project.api";


function NewLaunches() {
  const [
    projects,
    setProjects,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getNewLaunches();

        setProjects(
          response.data || []
        );

      } catch (error) {
        console.error(
          "New launches error:",
          error
        );

        setError(
          "Unable to load new launches."
        );

      } finally {
        setLoading(false);
      }
    };


    loadProjects();
  }, []);


  return (
    <section className="featuredProperties_container">

      <div
        className="represent_properties"
        style={{
          backgroundColor: "#F6F4EF",
        }}
      >

        {/* ===============================
            SECTION HEADER
        =============================== */}

        <div className="featured_properties">

          <div className="featured_properties_content">

            <h5>
              TRUSTED DEVELOPERS
            </h5>

            <h1>
              Projects & New Launches
            </h1>

            <p>
              Trusted developers,
              verified inventory
            </p>

          </div>

        </div>


        {/* ===============================
            PROJECT CARDS
        =============================== */}

        <div className="properties_container">

          {/* LOADING */}

          {loading && (
            <div className="property_state">
              Loading new launches...
            </div>
          )}


          {/* ERROR */}

          {!loading && error && (
            <div className="property_state property_error">
              {error}
            </div>
          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            projects.length === 0 && (
              <div className="property_state">
                No new launches available
                right now.
              </div>
            )}


          {/* PROJECTS */}

          {!loading &&
            !error &&
            projects.length > 0 && (
              <NewLaunchCard
                projects={projects}
              />
            )}

        </div>


        {/* ===============================
            VIEW ALL
        =============================== */}

        {!loading &&
          !error &&
          projects.length > 0 && (
            <button
              type="button"
              className="all_properties"
            >
              View all projects

              <BsArrowRight />
            </button>
          )}

      </div>

    </section>
  );
}


export default NewLaunches;