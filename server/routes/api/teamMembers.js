const TeamMember = require('../../models/TeamMember');

module.exports = (app) => {
  app.get('/api/teamMembers', (req, res, next) => {
    TeamMember.find()
      .exec()
      .then((teamMember) => res.json(teamMember))
      .catch((err) => next(err));
  });

  app.post('/api/teamMembers', function (req, res, next) {
    const teamMember = new TeamMember();

    teamMember.save()
      .then(() => res.json(teamMember))
      .catch((err) => next(err));
  });
};
