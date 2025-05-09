import { useTranslation } from "react-i18next";
import "../../styles/FilterBar.css";

const FilterBar = ({
  filterType,
  setFilterType,
  filterValue,
  setFilterValue,
  filterOptions,
}) => {
  const { t } = useTranslation();
  return (
    <div className="filterbar">
      <select
        className="filterbar__select"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="category">{t("filter.category")}</option>
        <option value="glass">{t("filter.glass")}</option>
        <option value="ingredient">{t("filter.ingredient")}</option>
        <option value="alcohol">{t("filter.alcohol")}</option>
      </select>
      <select
        className="filterbar__select"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      >
        <option value="">{t("filter.select")}</option>
        {filterOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
