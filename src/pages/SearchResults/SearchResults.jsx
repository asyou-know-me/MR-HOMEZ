import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { Search } from "lucide-react";

import PropertyCard from "../../shared/components/FeaturedProperties/PropertyCard";

import NewLaunchCard from "../../shared/components/NewLaunches/NewLaunchCard";

import { getProperties } from "../../entities/property/property.api";

import { getProjects } from "../../entities/project/project.api";

import "./SearchResults.css";

function SearchResults() {
  const [searchParams] = useSearchParams();

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const mode = searchParams.get("mode") || "properties";

  /* =================================================
     LOAD SEARCH RESULTS
  ================================================= */

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true);

        setError("");

        const search = searchParams.get("search") || "";

        const city = searchParams.get("city") || "";

        const propertyType = searchParams.get("propertyType") || "";

        /*
            PROJECT SEARCH
          */

        if (mode === "projects") {
          const launchStatus = searchParams.get("launchStatus") || "";

          const status = searchParams.get("status") || "active";

          const filters = {};

          if (search) {
            filters.search = search;
          }

          if (city) {
            filters.city = city;
          }

          if (propertyType) {
            filters.projectType = propertyType;
          }

          if (launchStatus) {
            filters.launchStatus = launchStatus;
          }

          if (status) {
            filters.status = status;
          }

          const response = await getProjects(filters);

          setResults(response.data || []);

          return;
        }

        /*
            PROPERTY SEARCH
          */

        const listingType = searchParams.get("listingType") || "";

        const filters = {};

        if (search) {
          filters.search = search;
        }

        if (city) {
          filters.city = city;
        }

        if (propertyType) {
          filters.propertyType = propertyType;
        }

        if (listingType) {
          filters.listingType = listingType;
        }

        const response = await getProperties(filters);

        setResults(response.data || []);
      } catch (error) {
        console.error("Search error:", error);

        setError("Unable to load search results.");
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [searchParams, mode]);

  /* =================================================
     TITLE
  ================================================= */

  const title = mode === "projects" ? "Projects & New Launches" : "Properties";

  return (
    <main className="search_results_page">
      <div className="search_results_container">
        {/* HEADER */}

        <div className="search_results_header">
          <div>
            <p>MR.HOMEZ</p>

            <h1>{title}</h1>
          </div>

          {!loading && !error && (
            <span>
              {results.length} {results.length === 1 ? "result" : "results"}
            </span>
          )}
        </div>

        {/* LOADING */}

        {loading && (
          <div className="search_results_state">
            <Search />
            Searching...
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="search_results_state search_results_error">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!loading && !error && results.length === 0 && (
          <div className="search_results_state">
            <Search />

            <h3>No results found</h3>

            <p>Try changing your city, property type, or search term.</p>
          </div>
        )}

        {/* RESULTS */}

        {!loading && !error && results.length > 0 && (
          <div className="search_results_grid">
            {mode === "projects" ? (
              <NewLaunchCard projects={results} />
            ) : (
              <PropertyCard properties={results} />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default SearchResults;
