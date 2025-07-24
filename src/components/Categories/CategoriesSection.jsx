import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import Button from "../UI/Button";
import Section from "../Layout/Section";

const CategoriesSection = ({ categories, categoriesRef, categoriesInView }) => {
  return (
    <Section 
      title="Robotics Categories" 
      inView={categoriesInView}
      ref={categoriesRef}
      rightElement={
        <Button 
          variant="text" 
          className="text-[#677E8A] hover:text-[#ABAFB5] flex items-center"
        >
          View All
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="ml-1"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Button>
      }
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: categoriesInView ? 0 : 50, opacity: categoriesInView ? 1 : 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </motion.div>
    </Section>
  );
};

export default CategoriesSection;