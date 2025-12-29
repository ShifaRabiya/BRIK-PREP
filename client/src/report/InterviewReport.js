import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CircularProgress from "./CircularProgress";

const Logo = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
  padding-left: 20px;
`;

export const Link = styled.a`
  color: #3b82f6;
  text-decoration: none;
  display: inline-block;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
    color: #3b82f6;
  }

  &:active,
  &:visited {
    color: #3b82f6;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #ffffff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

const InterviewDate = styled.div`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  grid-template-areas: "left right";

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "right"
      "left";
  }
`;

const LeftSection = styled.div`
  grid-area: left;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
`;

const RightSection = styled.div`
  grid-area: right;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
`;

const DetailsCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 30px;
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 40px 150px 1fr;
  align-items: center;
  padding: 15px 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
`;

const DetailValue = styled.div`
  font-size: 14px;
  color: #666;
`;

const EvaluationCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 30px;
`;

const EvaluationText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  margin: 0 0 20px 0;
`;

const CheckmarkBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 500;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled.div`
  background: #F9FAFB;
  border-radius: 12px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkillTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 25px;
  text-align: center;
`;

const ScoreCircle = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  margin-bottom: 25px;
`;

const ScoreNumber = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  font-weight: 700;
  color: #1a1a1a;
`;

const SkillDescription = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: #333;
  text-align: center;
  margin: 0;
`;

const OverallScoreCard = styled.div`
  background: #F9FAFB;
  border-radius: 12px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 20px;
`;

const OverallScoreTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 30px;
`;

const OverallScoreCircle = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const OverallScoreNumber = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 56px;
  font-weight: 700;
  color: #1a1a1a;
`;

const InterviewReport = () => {
  // Remove sessionId for dummy
  const [report, setReport] = useState(null);

  useEffect(() => {
    // Dummy report data
    const dummyReport = {
      date: new Date().toISOString(),
      overallScore: 75,
      technicalKnowledge: {
        "JavaScript": 65,
        "React": 70,
        "CSS": 80,
      },
      softSkills: {
        clarity: 80,
        strengths: ["Communication", "Teamwork"],
        weaknesses: ["Time Management"],
      },
      generalEvaluation: "Good performance overall, with room for improvement in time management.",
      motivation: "High motivation and enthusiasm for learning new technologies.",
    };

    // Simulate API delay
    setTimeout(() => {
      setReport(dummyReport);
    }, 500);
  }, []);

  if (!report) return <p>Loading report...</p>;

  const { date, overallScore, technicalKnowledge, softSkills, generalEvaluation, motivation } = report;

  return (
    <>
      <Logo>
        <span><Link href="https://www.brikcommunity.com/">BRIK</Link></span> PREP
      </Logo>
      <Container>
        <Header>
          <Title>Interview Report Summary</Title>
          <InterviewDate>Interview Date: {new Date(date).toLocaleDateString()}</InterviewDate>
        </Header>

        <MainContent>
          <LeftSection>
            <SectionTitle>General Evaluation</SectionTitle>
            <EvaluationCard>
              <EvaluationText>{generalEvaluation}</EvaluationText>
            </EvaluationCard>

            <SectionTitle>Technical Skills</SectionTitle>
            <SkillsGrid>
              {Object.entries(technicalKnowledge).map(([skill, score]) => (
                <SkillCard key={skill}>
                  <SkillTitle>{skill}</SkillTitle>
                  <CircularProgress percentage={score} />
                </SkillCard>
              ))}
            </SkillsGrid>

            <SectionTitle>Soft Skills</SectionTitle>
            <EvaluationCard>
              <p>Clarity in Speech: {softSkills.clarity}%</p>
              <p>Strengths: {softSkills.strengths.join(", ")}</p>
              <p>Weaknesses: {softSkills.weaknesses.join(", ")}</p>
            </EvaluationCard>

            <SectionTitle>Motivation</SectionTitle>
            <EvaluationCard>{motivation}</EvaluationCard>
          </LeftSection>

          <RightSection>
            <OverallScoreCard>
              <OverallScoreTitle>Overall Score</OverallScoreTitle>
              <CircularProgress percentage={overallScore} size={200} />
            </OverallScoreCard>
          </RightSection>
        </MainContent>
      </Container>
    </>
  );
};

export default InterviewReport;