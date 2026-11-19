import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ProjectShowcase } from '@/components/organisms/project-showcase';

function projectButton(title: string) {
  return screen.getByRole('button', { name: new RegExp(title) });
}

describe('ProjectShowcase', () => {
  it('lists every project and starts with Oniapp open', () => {
    renderWithProviders(<ProjectShowcase />);

    expect(
      screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent),
    ).toEqual([
      'Oniapp',
      'Oniapp Admin',
      'Seja',
      'Seja Admin',
      'Praça 22',
      'Ritmar',
      'Mince Joias',
    ]);
    expect(projectButton('^App mobile.*Fechar.*Oniapp')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(
      screen.getByText(
        'Full stack: temas por instituição, acessibilidade e testes automatizados.',
      ),
    ).toBeInTheDocument();
  });

  it('filters the list by group and marks the pressed filter', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectShowcase />);

    const mobileFilter = screen.getByRole('button', { name: /^Mobile\s*2$/ });
    await user.click(mobileFilter);

    expect(mobileFilter).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /^Todos\s*7$/ })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(
      screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent),
    ).toEqual(['Oniapp', 'Seja']);
  });

  it('keeps only one project open and closes the open one on a second click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectShowcase />);

    await user.click(projectButton('Ritmar'));

    expect(projectButton('Ritmar')).toHaveAttribute('aria-expanded', 'true');
    expect(projectButton('Fechar.*Ritmar')).toHaveAttribute(
      'aria-controls',
      'project-ritmar-details',
    );
    expect(screen.getAllByRole('button', { expanded: true })).toHaveLength(1);
    expect(screen.getByText('NestJS')).toBeInTheDocument();

    await user.click(projectButton('Ritmar'));

    expect(screen.queryAllByRole('button', { expanded: true })).toHaveLength(0);
  });
});
