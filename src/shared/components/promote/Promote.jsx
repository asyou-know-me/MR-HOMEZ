import {
  FaBan,
  FaShieldHalved,
  FaEye,
} from "react-icons/fa6";

function Promote() {
  return (
    <section className="promote_container">
      <div className="promote">

        {/* ITEM 1 */}
        <div className="one">
          <span className="promote_color_icon">
            <FaBan />
          </span>

          <span>
            <p>No Overprice - Ever</p>
          </span>
        </div>


        {/* DIVIDER */}
        <span className="two promote_color_icon">
          ✦
        </span>


        {/* ITEM 2 */}
        <div className="one">
          <span className="promote_color_icon">
            <FaBan />
          </span>

          <span>
            <p>No Fake Promises</p>
          </span>
        </div>


        {/* DIVIDER */}
        <span className="four promote_color_icon">
          ✦
        </span>


        {/* ITEM 3 */}
        <div className="one">
          <span className="promote_color_icon">
            <FaEye />
          </span>

          <span className="five">
            <p>100% Transparency</p>
          </span>
        </div>


        {/* DIVIDER */}
        <span className="six promote_color_icon">
          ✦
        </span>


        {/* HIGHLIGHTED ITEM */}
        <div className="seven">
          <span className="promote_color_icon">
            <FaShieldHalved />
          </span>

          <span>
            <p>
              <strong>
                Zero Hidden Charges
              </strong>
              {" "}
              - What We Say Is What You Pay
            </p>
          </span>
        </div>

      </div>
    </section>
  );
}

export default Promote;