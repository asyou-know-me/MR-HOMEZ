import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../../assets/logo.svg";

import {
  Calculator,
  ChevronDown,
  Menu,
  X,
  Landmark,
  Home,
  TrendingUp,
  Coins,
  HardHat,
  Ruler,
  KeyRound,
  Receipt,
  Banknote,
  Layers,
  FileText,
  ListChecks,
  MapPin,
  CircleDollarSign,
  CalendarCheck,
  CheckCircle2,
} from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const headerRef = useRef(null);

  const toolGroups = [
    {
      title: "LOAN & FINANCE",
      icon: Landmark,
      tools: [
        {
          name: "EMI Calculator",
          icon: Calculator,
          path: "/tools/emi-calculator",
        },
        {
          name: "Loan Eligibility",
          icon: CheckCircle2,
          path: "/tools/loan-eligibility",
        },
        {
          name: "Stamp Duty",
          icon: FileText,
          path: "/tools/stamp-duty",
        },
      ],
    },

    {
      title: "VALUATION",
      icon: TrendingUp,
      tools: [
        {
          name: "Property Value",
          icon: Home,
          path: "/tools/property-value",
        },
        {
          name: "Appreciation",
          icon: TrendingUp,
          path: "/tools/appreciation",
        },
        {
          name: "Flip Profit",
          icon: Coins,
          path: "/tools/flip-profit",
        },
      ],
    },

    {
      title: "CONSTRUCTION",
      icon: HardHat,
      tools: [
        {
          name: "Construction Cost",
          icon: Calculator,
          path: "/tools/construction-cost",
        },
        {
          name: "Floor Plan Cost",
          icon: Ruler,
          path: "/tools/floor-plan-cost",
        },
        {
          name: "Plot Converter",
          icon: Ruler,
          path: "/tools/plot-converter",
        },
      ],
    },

    {
      title: "RENTAL TOOLS",
      icon: KeyRound,
      tools: [
        {
          name: "Rent Receipt",
          icon: Receipt,
          path: "/tools/rent-receipt",
        },
        {
          name: "Rental Income",
          icon: Banknote,
          path: "/tools/rental-income",
        },
        {
          name: "Floor Income",
          icon: Layers,
          path: "/tools/floor-income",
        },
        {
          name: "Rent Agreement",
          icon: FileText,
          path: "/tools/rent-agreement",
        },
      ],
    },

    {
      title: "SMART TOOLS",
      icon: Calculator,
      tools: [
        {
          name: "Checklist",
          icon: ListChecks,
          path: "/tools/checklist",
        },
        {
          name: "Price Trend",
          icon: TrendingUp,
          path: "/tools/price-trend",
        },
        {
          name: "Nearby Facilities",
          icon: MapPin,
          path: "/tools/nearby-facilities",
        },
        {
          name: "Budget Quiz",
          icon: CircleDollarSign,
          path: "/tools/budget-quiz",
        },
        {
          name: "Site Visit",
          icon: CalendarCheck,
          path: "/tools/site-visit",
        },
      ],
    },
  ];

  const closeMenus = () => {
    setMenuOpen(false);
    setToolsOpen(false);
  };

  const toggleMobileMenu = () => {
    setMenuOpen((prev) => !prev);

    if (menuOpen) {
      setToolsOpen(false);
    }
  };

  const toggleTools = () => {
    setToolsOpen((prev) => !prev);
  };

  /*
    Close menu when clicking outside header
  */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setToolsOpen(false);
        setMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setToolsOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <header
      className="header_container"
      ref={headerRef}
    >

      {/* =====================================
          LOGO
      ====================================== */}

      <Link
        to="/"
        className="logo"
        onClick={closeMenus}
      >
        <img
          src={logo}
          alt="Mr. Homez"
        />
      </Link>


      {/* =====================================
          NAVIGATION
      ====================================== */}

      <nav
        className={`header_links ${
          menuOpen ? "open" : ""
        }`}
      >

        <Link
          to="/buyers"
          className="actual_links"
          onClick={closeMenus}
        >
          Buyers
        </Link>

        <Link
          to="/sellers"
          className="actual_links"
          onClick={closeMenus}
        >
          Sellers
        </Link>

        <Link
          to="/rent"
          className="actual_links"
          onClick={closeMenus}
        >
          Rent
        </Link>

        <Link
          to="/projects"
          className="actual_links"
          onClick={closeMenus}
        >
          Projects
        </Link>

        <Link
          to="/new-launch"
          className="actual_links"
          onClick={closeMenus}
        >
          New Launch
        </Link>


        {/* =====================================
            TOOLS BUTTON
        ====================================== */}

        <button
          type="button"
          className={`actual_links tools ${
            toolsOpen ? "tools_open" : ""
          }`}
          onClick={toggleTools}
          aria-expanded={toolsOpen}
        >
          <Calculator size={17} />

          <span>
            Tools
          </span>

          <ChevronDown
            size={15}
            className="tools_chevron"
          />
        </button>


        {/* =====================================
            TOOLS MEGA MENU
        ====================================== */}

        <div
          className={`tools_mega_menu ${
            toolsOpen ? "open" : ""
          }`}
        >
          <div className="tools_mega_inner">

            {toolGroups.map((group) => {
              const GroupIcon = group.icon;

              return (
                <div
                  className="tools_group"
                  key={group.title}
                >

                  {/* CATEGORY TITLE */}
                  <div className="tools_group_title">
                    <GroupIcon />

                    <span>
                      {group.title}
                    </span>
                  </div>


                  {/* CATEGORY LINE */}
                  <div className="tools_group_line" />


                  {/* TOOLS */}
                  <div className="tools_group_links">

                    {group.tools.map((tool) => {
                      const ToolIcon = tool.icon;

                      return (
                        <Link
                          key={tool.name}
                          to={tool.path}
                          className="tool_link"
                          onClick={closeMenus}
                        >
                          <ToolIcon />

                          <span>
                            {tool.name}
                          </span>
                        </Link>
                      );
                    })}

                  </div>

                </div>
              );
            })}

          </div>
        </div>


        <Link
          to="/news"
          className="actual_links"
          onClick={closeMenus}
        >
          News
        </Link>

      </nav>


      {/* =====================================
          HEADER BUTTONS
      ====================================== */}

      <div className="header_buttons">

        <button
          type="button"
          className="login_btn"
        >
          Login
        </button>


        <button
          type="button"
          className="list_property_btn"
        >
          List Property

          <span className="free_btn">
            FREE
          </span>
        </button>

      </div>


      {/* =====================================
          MOBILE MENU
      ====================================== */}

      <button
        type="button"
        className="menu_toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <X size={24} />
        ) : (
          <Menu size={24} />
        )}
      </button>

    </header>
  );
}

export default Header;